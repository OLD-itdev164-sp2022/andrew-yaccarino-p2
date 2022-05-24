import { _parse } from './parser';
import { register_locations } from '../constants';
import { get_storage, get_storage_other, set_storage } from './managememory';
import { execCodeAt } from './exec';
import { highlight } from '../components/Display';

function fillExtraSpace(values) {
    let output = new Uint8Array(256).fill(0);
    for (let i = 0; i < values.length; i++) {
        output[i] = values[i];
    }
    return output;
}

export const preload = function() {
    set_storage('ide-run',false);
    set_storage('Memory', new Uint8Array(256).fill(0));
}

export const setup = function(document) {
    let code_to_run = document.getElementById('ide-textarea').innerHTML;

    preload(); // reset

    let code = _parse(code_to_run);
    let mem = fillExtraSpace(code.code);
    mem[mem.length - register_locations.SP] = mem.length - 24; // setup stack pointer
    mem[mem.length - register_locations.OC] = mem.length - 16;

    window.global_mapping = code.mapping;
    set_storage('Memory', mem);
    set_storage('ide-run', true);
}

export const runtime = function(document) {
    let code = get_storage('Memory');

    // get program counter
    let pc = code[code.length - register_locations.PC];

    highlight(document, pc, 'css-vurnku');

    for (let x in window.global_mapping) { highlight(document, parseInt(x), 'hl_instr'); }

    let reply = execCodeAt(code);

    // get program counter
    pc = reply.code[reply.code.length - register_locations.PC];

    highlight(document, pc, 'hl_pc');

    set_storage('Memory', reply.code);
    set_storage('ide-run', reply.continue);
}

export const stop = function() {
    set_storage('ide-run', false);
}

export * from './managememory';