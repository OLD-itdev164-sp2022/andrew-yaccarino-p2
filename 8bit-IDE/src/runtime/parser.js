import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react/cjs/react.production.min';
import { opcodes, regex, op1_group, op2_group, regexNum, regexLabel } from '../constants';

function containsKeyword(x) {
    return (x === "A" || x === "B" || x ==="C" || x === "D" || x === "Z" || x === "NZ" || x === "NC");
}

function isVoid(instr, x) {
    if (x !== undefined) throw `${instr} has been called with more arguments than supported`
}

function createError(x) {
    return `${x} does not support this operand`;
}

function checkRegistersDifferent(instr, x,y) {
    if (x === y) throw createError(instr);
}

function getValue(x) {
    let txt;
    switch(x[0]) {
        case '[':
            return isRegOrNum(x.slice(1,x.length - 1), 'regaddress', 'address');
        case '"':
            txt = x.slice(1, x.length - 1);
            let txt_array = [];
            for (let i = 0; i < txt.length; i++) {
                txt_array[i] = txt[i].charCodeAt(0);
            }
            return {type: 'numbers', value: txt_array};
        case "'":
            txt = x.slice(1, x.length - 1);
            if (txt.length > 1) throw `Only one character is allowed`;
            return {type: 'number', value: txt.charCodeAt(0)};
        default:
            return isRegOrNum(x, 'register', 'number');
    }
}

function parseNumber(input) {
    if (input.slice(0, 2) === "0x") return parseInt(input.slice(2), 16);
    else if (input.slice(0, 2) === "0o") return parseInt(input.slice(2), 8);
    else if (regexNum.exec(input)) return parseInt(input, 10);
    else throw "Invalid number format";
};

function isRegOrNum(input, typeReg, typeNumber) {
    if (input === 'C') {
        return {type: typeReg, hiddenType: 'conditional', value: input};
    } else if (input === 'A' || input === 'B' || input === 'D') {
        return {type: typeReg, value: input};
    } else if (input === 'Z') {
        return {hiddenType: 'conditional', value: input};   
    }else {
        var label = regexLabel.exec(input)?input:undefined;
        if (label !== undefined) {
            return {type: typeNumber, value: label};
        } else {
            var value = parseNumber(input);

            if (isNaN(value)) throw `Not a ${typeNumber}: ${value}`;
            else if (value < 0 || value > 255) throw `${typeNumber} must have a value between 0-255`;

            return {type: typeNumber, value: value};
        }
    }
}

function _parse(codetxt) {
    let arr = codetxt.split('\n');

    let labels = {};
    let code = [];
    let mapping = {};
    let code_pos = 0;

    for (let i = 0; i < arr.length; i++) {
        try {
            let parsed_line = regex.exec(arr[i]);
            if (parsed_line[1] !== undefined || parsed_line[2] !== undefined) {
                let label = parsed_line[1];
                if (label !== undefined) {
                    label = label.toUpperCase();
                    if (label in labels)
                        throw `${label} is a duplicate label!`;

                    if (containsKeyword(label))
                        throw `${label} contains a keyword!`;

                    labels[label] = code.length;
                }

                if (parsed_line[2] !== undefined) {
                    let instruction = parsed_line[2].toUpperCase();
                    let p1, p2;

                    switch(instruction) {
                        case 'DB':
                            p1 = getValue(parsed_line[op1_group]);

                            if (p1.type === "number") {
                                code.push(p1.value);
                            } else if (p1.type === "numbers") {
                                code.push(...p1.value);
                            } else
                                throw createError('DB');
                            break;
                        case 'NOP':
                            isVoid('NOP',parsed_line[op1_group]);
                            code.push(opcodes.NOP);
                            break;
                        case 'HALT':
                            isVoid('HLT',parsed_line[op1_group]);
                            code.push(opcodes.HALT);
                            break;
                        case 'LD':
                            p1 = getValue(parsed_line[op1_group]);
                            p2 = getValue(parsed_line[op2_group]);

                            if (p1.type === 'register') {
                                if (p2.type === 'register') {
                                    checkRegistersDifferent('LD', p1.value, p2.value);
                                    code.push(opcodes[`LD_${p1.value}_${p2.value}`]);
                                } else if (p2.type === 'regaddress') {
                                    checkRegistersDifferent('LD', p1.value, p2.value);
                                    code.push(opcodes[`LD_${p1.value}_R${p2.value}`]);
                                } else if (p2.type === 'number')
                                    code.push(opcodes[`LD_${p1.value}_NUMBER`],p2.value);
                                else if (p2.type === 'address')
                                    code.push(opcodes[`LD_${p1.value}_ADDRESS`],p2.value);
                                else throw createError('LD');
                            } else if (p1.type === 'regaddress') {
                                if (p2.type === 'register') {
                                    checkRegistersDifferent('LD', p1.value, p2.value);
                                    code.push(opcodes[`LD_R${p1.value}_${p2.value}`]);
                                } else if (p2.type === 'number')
                                    code.push(opcodes[`LD_R${p1.value}_NUMBER`],p2.value);
                                else if (p2.type === 'address' || p1.type === 'number')
                                    code.push(opcodes[`LD_R${p1.value}_ADDRESS`],p2.value);
                                else throw createError('LD');
                            } else if (p1.type === 'address' || p1.type === 'number') {
                                if (p2.type === 'register')
                                    code.push(opcodes[`LD_ADDRESS_${p2.value}`],p1.value);
                                else if (p2.type === 'regaddress')
                                    code.push(opcodes[`LD_ADDRESS_R${p2.value}`],p1.value);
                                else throw createError('LD');
                            } else throw createError('LD');
                            break;
                        case 'JP':
                        case 'JZ':
                        case 'JC':
                            p1 = getValue(parsed_line[op1_group]);
                            isVoid(instruction,parsed_line[op2_group]);
                            

                            if (p1.type === 'address' || p1.type === 'number')
                                code.push(opcodes[`${instruction}_ADDRESS`], p1.value);
                            else if (p1.type === 'regaddress')
                                code.push(opcodes[`${instruction}_R${p1.value}`]);
                            else throw createError(instruction);
                            break;
                        case 'CALL':
                            p1 = getValue(parsed_line[op1_group]);

                            if (p1.type === 'number') {
                                isVoid('CALL', parsed_line[op2_group]);
                                code.push(opcodes.CALL_ADDRESS,p1.value);
                            } else if (p1.type === 'conditional') {
                                p2 = getValue(parsed_line[op2_group]);
                                if (p2.type === 'number') {
                                    if (p1.value === 'C') {
                                        code.push(opcodes.CALL_C_ADDRESS, p2.value);
                                    } else if (p1.value === 'Z') {
                                        code.push(opcodes.CALL_Z_ADDRESS, p2.value);
                                    } else throw createError('CALL');
                                } else throw createError('CALL');
                            } else throw createError('CALL');
                            break;
                        case 'RET':
                            if (parsed_line[op1_group] !== undefined) {
                                p1 = getValue(parsed_line[op1_group]);
                                isVoid('RET', parsed_line[op2_group]);
                                
                                if (p1.type === 'conditional')
                                    code.push(opcodes[`RET_${p1.value}`]);
                                else throw createError('RET');
                            } else {
                                isVoid('RET', parsed_line[op1_group]);

                                code.push(opcodes.RET);
                            }
                            break;
                        case 'PUSH':
                            p1 = getValue(parsed_line[op1_group]);
                            isVoid('PUSH', parsed_line[op2_group]);

                            if (p1.type === 'register')
                                code.push(opcodes[`PUSH_${p1.value}`]);
                            else if (p1.type === 'regaddress')
                                code.push(opcodes[`PUSH_R${p1.value}`]);
                            else if (p1.type === 'number')
                                code.push(opcodes.PUSH_NUMBER, p1.value);
                            else if (p1.type === 'address')
                                code.push(opcodes.PUSH_NUMBER, p1.value);
                            else throw createError('PUSH');
                            break;
                        case 'POP':
                            p1 = getValue(parsed_line[op1_group]);
                            isVoid('POP', parsed_line[op2_group]);

                            if (p1.type === 'register')
                                code.push(opcodes[`POP_${p1.value}`]);
                            else throw createError('POP');
                            break;
                        case 'AND':
                        case 'OR':
                        case 'XOR':
                            p1 = getValue(parsed_line[op1_group]);
                            isVoid(instruction, parsed_line[op2_group]);

                            if (p1.type === 'register') {
                                checkRegistersDifferent(instruction, p1.value, 'A');
                                code.push(opcodes[`${instruction}_${p1.value}`]);
                            } else if (p1.type === 'regaddress') {
                                checkRegistersDifferent(instruction, p1.value, 'A');
                                code.push(opcodes[`${instruction}_R${p1.value}`]);
                            } else if (p1.type === 'number')
                                code.push(opcodes[`${instruction}_NUMBER`],p1.value);
                            else if (p1.type === 'address')
                                code.push(opcodes[`${instruction}_ADDRESS`],p1.value);
                            else throw createError(instruction);
                            break;
                        case 'NOT':
                            p1 = getValue(parsed_line[op1_group]);
                            isVoid(instruction, parsed_line[op2_group]);

                            if (p1.type === 'register') {
                                checkRegistersDifferent('NOT', p1.value, 'A');
                                code.push(opcodes[`NOT_${p1.value}`]);
                            } else throw createError('NOT');
                            break;
                        case 'CMP':
                            p1 = getValue(parsed_line[op1_group]);
                            p2 = getValue(parsed_line[op2_group]);
                            
                            if (p1.type === 'register') {
                                if (p2.type === 'register') {
                                    checkRegistersDifferent('CMP', p1.value, p2.value);
                                    code.push(opcodes[`CMP_${p1.value}_${p2.value}`]);
                                } else if (p2.type === 'regaddress') {
                                    checkRegistersDifferent('CMP', p1.value, p2.value);
                                    code.push(opcodes[`CMP_${p1.value}_R${p2.value}`]);
                                } else if (p2.type === 'number')
                                    code.push(opcodes[`CMP_${p1.value}_NUMBER`],p1.value);
                                else if (p2.type === 'address')
                                    code.push(opcodes[`CMP_${p1.value}_ADDRESS`],p2.value);
                                else throw createError('CMP');
                            } else throw createError('CMP');
                            break;
                        case 'INC':
                        case 'DEC':
                            p1 = getValue(parsed_line[op1_group]);
                            isVoid(instruction, parsed_line[op2_group]);

                            if (p1.type === 'register')
                                code.push(opcodes[`${instruction}_${p1.value}`]);
                            else if (p1.type === 'regaddress')
                                code.push(opcodes[`${instruction}_R${p1.value}`]);
                            else if (p1.type === 'address')
                                code.push(opcodes[`${instruction}_ADDRESS`],p1.value);
                            else throw createError(instruction);
                            break;
                        case 'ADD':
                        case 'SUB':
                            p1 = getValue(parsed_line[op1_group]);
                            p2 = getValue(parsed_line[op2_group]);

                            if (p1.type === 'register') {
                                if (p2.type === 'register') {
                                    checkRegistersDifferent(instruction, p1.value, p2.value);
                                    code.push(opcodes[`${instruction}_${p1.value}_${p2.value}`]);
                                } else if (p2.type === 'regaddress') {
                                    checkRegistersDifferent(instruction, p1.value, p2.value);
                                    code.push(opcodes[`${instruction}_${p1.value}_R${p2.value}`]);
                                } else if (p2.type === 'number')
                                    code.push(opcodes[`${instruction}_${p1.value}_NUMBER`], p2.value);
                                else if (p2.type === 'address')
                                    code.push(opcodes[`${instruction}_${p1.value}_ADDRESS`],p2.value);
                                else throw createError(instruction);
                            } else throw createError(instruction);
                            break;
                        case 'BIT':
                            p1 = getValue(parsed_line[op1_group]);
                            isVoid(instruction, parsed_line[op2_group]);

                            if (p1.type === 'number') {
                                if (p1.value < 0 || p1.value > 7) throw createError('BIT');
                                code.push(opcodes[`BIT_${p1.value}`]);
                            } else throw createError('BIT');
                            break;
                        case 'SWAP':
                            p1 = getValue(parsed_line[op1_group]);
                            isVoid(instruction, parsed_line[op2_group]);

                            if (p1.type === 'register') {
                                code.push(opcodes[`SWAP_${p1.value}`]);
                            } else throw createError('SWAP');
                            break;
                        case 'OUT':
                            isVoid('OUT', parsed_line[op1_group]);
                            code.push(opcodes.OUT);
                            break;
                        case 'DEL':
                            isVoid('DEL', parsed_line[op1_group]);
                            code.push(opcodes.DEL);
                            break;
                        default:
                            throw `Invalid instruction: ${parsed_line[2]}`;
                    }
                    if (instruction !== 'DB') mapping[code_pos] = i;
                    code_pos++;
                    if (p1 && p1.type !== 'register' && p1.type !== 'regaddress') code_pos++;
                    if (p2 && p2.type !== 'register' && p2.type !== 'regaddress') code_pos++;
                    if (instruction === 'DB' && p1 && p1.type === 'numbers') code_pos += p1.value.length - 2;
                }
            } else {
                // handle comments
                let line = arr[i].trim();
                if (line !== "" && line[0] !== ";") throw `Syntax error`;
            }
        } catch(e) {
            throw e;
            throw {error: e, line: i};
        }
    }

    // replace label
    for (let i = 0, l = code.length; i < l; i++) {
        if (isNaN(code[i])) {
            let tgt = code[i].toUpperCase();
            if (tgt in labels) code[i] = labels[tgt];
            else throw {error: `Unknown label: ${tgt}`};
        }
    }

    return {code: code, mapping: mapping, labels: labels};
}

export { _parse };