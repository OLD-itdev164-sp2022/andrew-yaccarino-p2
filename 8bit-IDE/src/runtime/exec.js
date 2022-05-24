import { opcodes, register_locations, flag_masks, bit_masks } from "../constants";

function isBitSet(value,flag) {
    return (value & flag) === flag;
}

export const execCodeAt = function(code, window) {
    let A = code.length - register_locations.A;
    let B = code.length - register_locations.B;
    let C = code.length - register_locations.C;
    let D = code.length - register_locations.D;
    let F = code.length - register_locations.F;
    let SP = code.length - register_locations.SP;
    let PC = code.length - register_locations.PC;
    let OC = code.length - register_locations.OC;

    let index = code[PC];
    let value = code[index];
    let v1,v2;

    switch(value) {
        case opcodes.NOP: break;
        case opcodes.HALT:
            window.clearInterval(window.global_intervalID);; // stop running
            return code;
        case opcodes.LD_A_ADDRESS:
            v1 = code[++index];
            v2 = A;
            code[v1] = code[v2];
            break;
        case opcodes.LD_B_ADDRESS:
            v1 = code[++index];
            v2 = B;
            code[v1] = code[v2];
            break;
        case opcodes.LD_C_ADDRESS:
            v1 = code[++index];
            v2 = C;
            code[v1] = code[v2];
            break;
        case opcodes.LD_D_ADDRESS:
            v1 = code[++index];
            v2 = D;
            code[v1] = code[v2];
            break;
        case opcodes.LD_RA_ADDRESS:
            v1 = code[++index];
            v2 = code[A];
            code[v1] = code[v2];
            break;
        case opcodes.LD_RB_ADDRESS:
            v1 = code[++index];
            v2 = code[B];
            code[v1] = code[v2];
            break;
        case opcodes.LD_RC_ADDRESS:
            v1 = code[++index];
            v2 = code[C];
            code[v1] = code[v2];
            break;
        case opcodes.LD_RD_ADDRESS:
            v1 = code[++index];
            v2 = code[D];
            code[v1] = code[v2];
            break;
        case opcodes.LD_ADDRESS_A:
            v1 = A;
            v2 = code[++index];
            code[v1] = code[v2];
            break;
        case opcodes.LD_ADDRESS_B:
            v1 = B;
            v2 = code[++index];
            code[v1] = code[v2];
            break;
        case opcodes.LD_ADDRESS_C:
            v1 = C;
            v2 = code[++index];
            code[v1] = code[v2];
            break;
        case opcodes.LD_ADDRESS_D:
            v1 = D;
            v2 = code[++index];
            code[v1] = code[v2];
            break;
        case opcodes.LD_ADDRESS_RA:
            v1 = code[A];
            v2 = code[++index];
            code[v1] = code[v2];
            break;
        case opcodes.LD_ADDRESS_RA:
            v1 = code[B];
            v2 = code[++index];
            code[v1] = code[v2];
            break;
        case opcodes.LD_ADDRESS_RA:
            v1 = code[C];
            v2 = code[++index];
            code[v1] = code[v2];
            break;
        case opcodes.LD_ADDRESS_RA:
            v1 = code[D];
            v2 = code[++index];
            code[v1] = code[v2];
            break;
        case opcodes.LD_A_NUMBER:
            v1 = ++index;
            v2 = A;
            code[v1] = code[v2];
            break;
        case opcodes.LD_B_NUMBER:
            v1 = B;
            v2 = ++index;
            code[v1] = code[v2];
            break;
        case opcodes.LD_C_NUMBER:
            v1 = C;
            v2 = ++index;
            code[v1] = code[v2];
            break;
        case opcodes.LD_D_NUMBER:
            v1 = D;
            v2 = ++index;
            code[v1] = code[v2];
            break;
        case opcodes.LD_RA_NUMBER:
            v1 = code[A];
            v2 = ++index;
            code[v1] = code[v2];
            break;
        case opcodes.LD_RB_NUMBER:
            v1 = code[B];
            v2 = ++index;
            code[v1] = code[v2];
            break;
        case opcodes.LD_RC_NUMBER:
            v1 = code[C];
            v2 = ++index;
            code[v1] = code[v2];
            break;
        case opcodes.LD_RD_NUMBER:
            v1 = code[D];
            v2 = ++index;
            code[v1] = code[v2];
            break;
        case opcodes.LD_A_RB:
            v1 = code[B];
            v2 = A;
            code[v1] = code[v2];
            break;
        case opcodes.LD_A_RC:
            v1 = code[C];
            v2 = A;
            code[v1] = code[v2];
            break;
        case opcodes.LD_A_RD:
            v1 = code[D];
            v2 = A;
            code[v1] = code[v2];
            break;
        case opcodes.LD_B_RA:
            v1 = code[A];
            v2 = B;
            code[v1] = code[v2];
            break;
        case opcodes.LD_B_RC:
            v1 = code[C];
            v2 = B;
            code[v1] = code[v2];
            break;
        case opcodes.LD_B_RD:
            v1 = code[D];
            v2 = B;
            code[v1] = code[v2];
            break;
        case opcodes.LD_C_RA:
            v1 = code[A];
            v2 = C;
            code[v1] = code[v2];
            break;
        case opcodes.LD_C_RB:
            v1 = code[B];
            v2 = C;
            code[v1] = code[v2];
            break;
        case opcodes.LD_C_RD:
            v1 = code[D];
            v2 = C;
            code[v1] = code[v2];
            break;
        case opcodes.LD_D_RA:
            v1 = code[A];
            v2 = D;
            code[v1] = code[v2];
            break;
        case opcodes.LD_D_RB:
            v1 = code[B];
            v2 = D;
            code[v1] = code[v2];
            break;
        case opcodes.LD_D_RC:
            v1 = code[C];
            v2 = D;
            code[v1] = code[v2];
            break;
        case opcodes.LD_RA_B:
            v1 = B;
            v2 = code[A];
            code[v1] = code[v2];
            break;
        case opcodes.LD_RA_C:
            v1 = C;
            v2 = code[A];
            code[v1] = code[v2];
            break;
        case opcodes.LD_RA_D:
            v1 = D;
            v2 = code[A];
            code[v1] = code[v2];
            break;
        case opcodes.LD_RB_A:
            v1 = A;
            v2 = code[B];
            code[v1] = code[v2];
            break;
        case opcodes.LD_RB_C:
            v1 = C;
            v2 = code[B];
            code[v1] = code[v2];
            break;
        case opcodes.LD_RB_D:
            v1 = D;
            v2 = code[B];
            code[v1] = code[v2];
            break;
        case opcodes.LD_RC_A:
            v1 = A;
            v2 = code[C];
            code[v1] = code[v2];
            break;
        case opcodes.LD_RC_B:
            v1 = B;
            v2 = code[C];
            code[v1] = code[v2];
            break;
        case opcodes.LD_RC_D:
            v1 = D;
            v2 = code[C];
            code[v1] = code[v2];
            break;
        case opcodes.LD_RD_A:
            v1 = A;
            v2 = code[D];
            code[v1] = code[v2];
            break;
        case opcodes.LD_RD_B:
            v1 = B;
            v2 = code[D];
            code[v1] = code[v2];
            break;
        case opcodes.LD_RD_C:
            v1 = C;
            v2 = code[D];
            code[v1] = code[v2];
            break;
        case opcodes.LD_A_B:
            v1 = B;
            v2 = A;
            code[v1] = code[v2];
            break;
        case opcodes.LD_A_C:
            v1 = C;
            v2 = A;
            code[v1] = code[v2];
            break;
        case opcodes.LD_A_D:
            v1 = D;
            v2 = A;
            code[v1] = code[v2];
            break;
        case opcodes.LD_B_A:
            v1 = A;
            v2 = B;
            code[v1] = code[v2];
            break;
        case opcodes.LD_B_C:
            v1 = C;
            v2 = B;
            code[v1] = code[v2];
            break;
        case opcodes.LD_B_D:
            v1 = D;
            v2 = B;
            code[v1] = code[v2];
            break;
        case opcodes.LD_C_A:
            v1 = A;
            v2 = C;
            code[v1] = code[v2];
            break;
        case opcodes.LD_C_B:
            v1 = B;
            v2 = C;
            code[v1] = code[v2];
            break;
        case opcodes.LD_C_D:
            v1 = D;
            v2 = C;
            code[v1] = code[v2];
            break;
        case opcodes.LD_D_A:
            v1 = A;
            v2 = D;
            code[v1] = code[v2];
            break;
        case opcodes.LD_D_B:
            v1 = B;
            v2 = D;
            code[v1] = code[v2];
            break;
        case opcodes.LD_D_C:
            v1 = C;
            v2 = D;
            code[v1] = code[v2];
            break;
        case opcodes.JP_ADDRESS:
            v1 = ++index;
            index = code[v1] - 1;
            break;
        case opcodes.JP_RA:
            v1 = code[A];
            index = code[v1] - 1;
            break;
        case opcodes.JP_RB:
            v1 = code[B];
            index = code[v1] - 1;
            break;
        case opcodes.JP_RC:
            v1 = code[C];
            index = code[v1] - 1;
            break;
        case opcodes.JP_RD:
            v1 = code[D];
            index = code[v1] - 1;
            break;
        case opcodes.JZ_ADDRESS:
            if (isBitSet(code[F],flag_masks.Z)) {
                v1 = ++index;
                index = code[v1] - 1;
            } else index++;
            break;
        case opcodes.JZ_RA:
            if (isBitSet(code[F],flag_masks.Z)) {
                v1 = code[A];
                index = code[v1] - 1;
            }
            break;
        case opcodes.JZ_RB:
            if (isBitSet(code[F],flag_masks.Z)) {
                v1 = code[B];
                index = code[v1] - 1;
            }
            break;
        case opcodes.JZ_RC:
            if (isBitSet(code[F],flag_masks.Z)) {
                v1 = code[C];
                index = code[v1] - 1;
            }
            break;
        case opcodes.JZ_RD:
            if (isBitSet(code[F],flag_masks.Z)) {
                v1 = code[D];
                index = code[v1] - 1;
            }
            break;
        case opcodes.JC_ADDRESS:
            if (isBitSet(code[F],flag_masks.C)) {
                v1 = ++index;
                index = code[v1] - 1;
            } else index++;
            break;
        case opcodes.JC_RA:
            if (isBitSet(code[F],flag_masks.C)) {
                v1 = code[A];
                index = code[v1] - 1;
            }
            break;
        case opcodes.JC_RB:
            if (isBitSet(code[F],flag_masks.C)) {
                v1 = code[B];
                index = code[v1] - 1;
            }
            break;
        case opcodes.JC_RC:
            if (isBitSet(code[F],flag_masks.C)) {
                v1 = code[C];
                index = code[v1] - 1;
            }
            break;
        case opcodes.JC_RD:
            if (isBitSet(code[F],flag_masks.C)) {
                v1 = code[D];
                index = code[v1] - 1;
            }
            break;
        case opcodes.CALL_ADDRESS:
            v1 = ++index;
            code[code[SP]] = index;
            code[SP]--;
            index = code[v1] - 1;
            break;
        case opcodes.CALL_Z_ADDRESS:
            if (isBitSet(code[F],flag_masks.Z)) {
                v1 = ++index;
                code[code[SP]] = index;
                code[SP]--;
                index = code[v1] - 1;
            } else index++;
            break;
        case opcodes.CALL_C_ADDRESS:
            if (isBitSet(code[F],flag_masks.C)) {
                v1 = ++index;
                code[code[SP]] = index;
                code[SP]--;
                index = code[v1] - 1;
            } else index++;
            break;
        case opcodes.RET:
            code[SP]++;
            index = code[code[SP]];
            break;
        case opcodes.RET_Z:
            if (isBitSet(code[F],flag_masks.Z)) {
                code[SP]++;
                index = code[code[SP]];
            }
            break;
        case opcodes.RET_NZ:
            if (!isBitSet(code[F],flag_masks.Z)) {
                code[SP]++;
                index = code[code[SP]];
            }
            break;
        case opcodes.RET_C:
            if (isBitSet(code[F],flag_masks.C)) {
                code[SP]++;
                index = code[code[SP]];
            }
            break;
        case opcodes.RET_NC:
            if (!isBitSet(code[F],flag_masks.C)) {
                code[SP]++;
                index = code[code[SP]];
            }
            break;
        case opcodes.PUSH_ADDRESS:
            v1 = code[++index];
            code[code[SP]] = code[v1];
            code[SP]--;
            break;
        case opcodes.PUSH_NUMBER:
            v1 = ++index;
            code[code[SP]] = code[v1];
            code[SP]--;
            break;
        case opcodes.PUSH_A:
            v1 = A;
            code[code[SP]] = code[v1];
            code[SP]--;
            break;
        case opcodes.PUSH_B:
            v1 = B;
            code[code[SP]] = code[v1];
            code[SP]--;
            break;
        case opcodes.PUSH_C:
            v1 = C;
            code[code[SP]] = code[v1];
            code[SP]--;
            break;
        case opcodes.PUSH_D:
            v1 = D;
            code[code[SP]] = code[v1];
            code[SP]--;
            break;
        case opcodes.PUSH_RA:
            v1 = code[A];
            code[code[SP]] = code[v1];
            code[SP]--;
            break;
        case opcodes.PUSH_RB:
            v1 = code[B];
            code[code[SP]] = code[v1];
            code[SP]--;
            break;
        case opcodes.PUSH_RC:
            v1 = code[C];
            code[code[SP]] = code[v1];
            code[SP]--;
            break;
        case opcodes.PUSH_RD:
            v1 = code[D];
            code[code[SP]] = code[v1];
            code[SP]--;
            break;
        case opcodes.POP_A:
            v1 = A;
            code[SP]++;
            code[v1] = code[code[SP]];
            break;
        case opcodes.POP_B:
            v1 = B;
            code[SP]++;
            code[v1] = code[code[SP]];
            break;
        case opcodes.POP_C:
            v1 = C;
            code[SP]++;
            code[v1] = code[code[SP]];
            break;
        case opcodes.POP_D:
            v1 = D;
            code[SP]++;
            code[v1] = code[code[SP]];
            break;
        case opcodes.AND_ADDRESS:
            v1 = A;
            v2 = code[++index];
            code[v1] &= code[v2];
            break;
        case opcodes.AND_NUMBER:
            v1 = A;
            v2 = ++index;
            code[v1] &= code[v2];
        case opcodes.AND_RB:
            v1 = A;
            v2 = code[B];
            code[v1] &= code[v2];
            break;
        case opcodes.AND_RC:
            v1 = A;
            v2 = code[C];
            code[v1] &= code[v2];
            break;
        case opcodes.AND_RD:
            v1 = A;
            v2 = code[D];
            code[v1] &= code[v2];
            break;
        case opcodes.AND_B:
            v1 = A;
            v2 = B;
            code[v1] &= code[v2];
            break;
        case opcodes.AND_C:
            v1 = A;
            v2 = C;
            code[v1] &= code[v2];
            break;
        case opcodes.AND_D:
            v1 = A;
            v2 = D;
            code[v1] &= code[v2];
            break;
        case opcodes.OR_ADDRESS:
            v1 = A;
            v2 = code[++index];
            code[v1] |= code[v2];
            break;
        case opcodes.OR_NUMBER:
            v1 = A;
            v2 = ++index;
            code[v1] |= code[v2];
        case opcodes.OR_RB:
            v1 = A;
            v2 = code[B];
            code[v1] |= code[v2];
            break;
        case opcodes.OR_RC:
            v1 = A;
            v2 = code[C];
            code[v1] |= code[v2];
            break;
        case opcodes.OR_RD:
            v1 = A;
            v2 = code[D];
            code[v1] |= code[v2];
            break;
        case opcodes.OR_B:
            v1 = A;
            v2 = B;
            code[v1] |= code[v2];
            break;
        case opcodes.OR_C:
            v1 = A;
            v2 = C;
            code[v1] |= code[v2];
            break;
        case opcodes.OR_D:
            v1 = A;
            v2 = D;
            code[v1] |= code[v2];
            break;
        case opcodes.XOR_ADDRESS:
            v1 = A;
            v2 = code[++index];
            code[v1] ^= code[v2];
            break;
        case opcodes.XOR_NUMBER:
            v1 = A;
            v2 = ++index;
            code[v1] ^= code[v2];
        case opcodes.XOR_RB:
            v1 = A;
            v2 = code[B];
            code[v1] ^= code[v2];
            break;
        case opcodes.XOR_RC:
            v1 = A;
            v2 = code[C];
            code[v1] ^= code[v2];
            break;
        case opcodes.XOR_RD:
            v1 = A;
            v2 = code[D];
            code[v1] ^= code[v2];
            break;
        case opcodes.XOR_B:
            v1 = A;
            v2 = B;
            code[v1] ^= code[v2];
            break;
        case opcodes.XOR_C:
            v1 = A;
            v2 = C;
            code[v1] ^= code[v2];
            break;
        case opcodes.XOR_D:
            v1 = A;
            v2 = D;
            code[v1] ^= code[v2];
            break;
        case opcodes.NOT_A:
            v1 = A;
            code[v1] = ~code[v1];
            break;
        case opcodes.NOT_B:
            v1 = B;
            code[v1] = ~code[v1];
            break;
        case opcodes.NOT_C:
            v1 = C;
            code[v1] = ~code[v1];
            break;
        case opcodes.NOT_D:
            v1 = D;
            code[v1] = ~code[v1];
            break;
        case opcodes.CMP_A_ADDRESS:
            v1 = code[++index];
            v2 = A;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_B_ADDRESS:
            v1 = code[++index];
            v2 = B;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_C_ADDRESS:
            v1 = code[++index];
            v2 = C;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_D_ADDRESS:
            v1 = code[++index];
            v2 = D;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_A_NUMBER:
            v1 = ++index;
            v2 = A;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_B_NUMBER:
            v1 = ++index;
            v2 = B;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_C_NUMBER:
            v1 = ++index;
            v2 = C;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_D_NUMBER:
            v1 = ++index;
            v2 = D;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_A_RB:
            v1 = code[B];
            v2 = A;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_A_RC:
            v1 = code[C];
            v2 = A;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_A_RD:
            v1 = code[D];
            v2 = A;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_B_RA:
            v1 = code[A];
            v2 = B;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_B_RC:
            v1 = code[C];
            v2 = B;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_B_RD:
            v1 = code[D];
            v2 = B;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_C_RA:
            v1 = code[A];
            v2 = C;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_C_RB:
            v1 = code[B];
            v2 = C;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_C_RD:
            v1 = code[D];
            v2 = C;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_D_RA:
            v1 = code[A];
            v2 = D;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_D_RB:
            v1 = code[B];
            v2 = D;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_D_RC:
            v1 = code[C];
            v2 = D;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_A_B:
            v1 = B;
            v2 = A;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_A_C:
            v1 = C;
            v2 = A;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_A_D:
            v1 = D;
            v2 = A;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_B_A:
            v1 = A;
            v2 = B;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_B_C:
            v1 = C;
            v2 = B;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_B_D:
            v1 = D;
            v2 = B;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_C_A:
            v1 = A;
            v2 = C;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_C_B:
            v1 = B;
            v2 = C;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_C_D:
            v1 = D;
            v2 = C;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_D_A:
            v1 = A;
            v2 = D;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_D_B:
            v1 = B;
            v2 = D;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.CMP_D_C:
            v1 = C;
            v2 = D;

            code[F] = 0; // reset flags
            
            // I think?
            if (code[v1] == code[v2]) code[F] |= flag_masks.Z;
            if (code[v1] > code[v2]) code[F] |= flag_masks.C;
            break;
        case opcodes.INC_ADDRESS:
            v1 = code[++index];

            code[F] = 0; // reset flags

            if (code[v1] + 1 > 255) code[F] |= flag_masks.C;
            code[v1]++;
            break;
        case opcodes.INC_RA:
            v1 = code[A];
            
            code[F] = 0; // reset flags

            if (code[v1] + 1 > 255) code[F] |= flag_masks.C;
            code[v1]++;
            break;
        case opcodes.INC_RB:
            v1 = code[B];
            
            code[F] = 0; // reset flags

            if (code[v1] + 1 > 255) code[F] |= flag_masks.C;
            code[v1]++;
            break;
        case opcodes.INC_RC:
            v1 = code[C];
            
            code[F] = 0; // reset flags

            if (code[v1] + 1 > 255) code[F] |= flag_masks.C;
            code[v1]++;
            break;
        case opcodes.INC_RD:
            v1 = code[D];
            
            code[F] = 0; // reset flags

            if (code[v1] + 1 > 255) code[F] |= flag_masks.C;
            code[v1]++;
            break;
        case opcodes.INC_A:
            v1 = A;
            
            code[F] = 0; // reset flags

            if (code[v1] + 1 > 255) code[F] |= flag_masks.C;
            code[v1]++;
            break;
        case opcodes.INC_B:
            v1 = B;
            
            code[F] = 0; // reset flags

            if (code[v1] + 1 > 255) code[F] |= flag_masks.C;
            code[v1]++;
            break;
        case opcodes.INC_C:
            v1 = C;
            
            code[F] = 0; // reset flags

            if (code[v1] + 1 > 255) code[F] |= flag_masks.C;
            code[v1]++;
            break;
        case opcodes.INC_D:
            v1 = D;
            
            code[F] = 0; // reset flags

            if (code[v1] + 1 > 255) code[F] |= flag_masks.C;
            code[v1]++;
            break;
        case opcodes.DEC_ADDRESS:
            v1 = code[++index];

            code[F] = 0; // reset flags

            if (code[v1] - 1 == 0) code[F] |= flag_masks.Z;
            code[v1]--;
            break;
        case opcodes.DEC_RA:
            v1 = code[A];
            
            code[F] = 0; // reset flags

            if (code[v1] - 1 == 0) code[F] |= flag_masks.Z;
            code[v1]--;
            break;
        case opcodes.DEC_RB:
            v1 = code[B];
            
            code[F] = 0; // reset flags

            if (code[v1] - 1 == 0) code[F] |= flag_masks.Z;
            code[v1]--;
            break;
        case opcodes.DEC_RC:
            v1 = code[C];
            
            code[F] = 0; // reset flags

            if (code[v1] - 1 == 0) code[F] |= flag_masks.Z;
            code[v1]--;
            break;
        case opcodes.DEC_RD:
            v1 = code[D];
            
            code[F] = 0; // reset flags

            if (code[v1] - 1 == 0) code[F] |= flag_masks.Z;
            code[v1]--;
            break;
        case opcodes.DEC_A:
            v1 = A;
            
            code[F] = 0; // reset flags

            if (code[v1] - 1 == 0) code[F] |= flag_masks.Z;
            code[v1]--;
            break;
        case opcodes.DEC_B:
            v1 = B;
            
            code[F] = 0; // reset flags

            if (code[v1] - 1 == 0) code[F] |= flag_masks.Z;
            code[v1]--;
            break;
        case opcodes.DEC_C:
            v1 = C;
            
            code[F] = 0; // reset flags

            if (code[v1] - 1 == 0) code[F] |= flag_masks.Z;
            code[v1]--;
            break;
        case opcodes.DEC_D:
            v1 = D;
            
            code[F] = 0; // reset flags

            if (code[v1] - 1 == 0) code[F] |= flag_masks.Z;
            code[v1]--;
            break;
        case opcodes.ADD_A_ADDRESS:
            v1 = A;
            v2 = code[++index];

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_B_ADDRESS:
            v1 = B;
            v2 = code[++index];

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_C_ADDRESS:
            v1 = C;
            v2 = code[++index];

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_D_ADDRESS:
            v1 = D;
            v2 = code[++index];

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_A_NUMBER:
            v1 = A;
            v2 = ++index;

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_B_NUMBER:
            v1 = B;
            v2 = ++index;

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_C_NUMBER:
            v1 = C;
            v2 = ++index;

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_D_NUMBER:
            v1 = D;
            v2 = ++index;

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_A_RB:
            v1 = A;
            v2 = code[B];

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_A_RC:
            v1 = A;
            v2 = code[C];

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_A_RD:
            v1 = A;
            v2 = code[D];

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_B_RA:
            v1 = B;
            v2 = code[A];

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_B_RC:
            v1 = B;
            v2 = code[C];

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_B_RD:
            v1 = B;
            v2 = code[D];

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_C_RA:
            v1 = C;
            v2 = code[A];

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_C_RB:
            v1 = C;
            v2 = code[B];

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_C_RD:
            v1 = C;
            v2 = code[D];

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_D_RA:
            v1 = D;
            v2 = code[A];

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_D_RB:
            v1 = D;
            v2 = code[B];

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_D_RC:
            v1 = D;
            v2 = code[C];

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_A_B:
            v1 = A;
            v2 = B;

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_A_C:
            v1 = A;
            v2 = C;

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_A_D:
            v1 = A;
            v2 = D;

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_B_A:
            v1 = B;
            v2 = A;

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_B_C:
            v1 = B;
            v2 = C;

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_B_D:
            v1 = B;
            v2 = D;

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_C_A:
            v1 = C;
            v2 = A;

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_C_B:
            v1 = C;
            v2 = B;

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_C_D:
            v1 = C;
            v2 = D;

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_D_A:
            v1 = D;
            v2 = A;

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_D_B:
            v1 = D;
            v2 = B;

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.ADD_D_C:
            v1 = D;
            v2 = C;

            code[F] = 0; // reset flags

            if (code[v1] + code[v2] > 255) code[F] |= flag_masks.C;
            code[v1] += code[v2];
            break;
        case opcodes.SUB_A_ADDRESS:
            v1 = A;
            v2 = code[++index];

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_B_ADDRESS:
            v1 = B;
            v2 = code[++index];

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_C_ADDRESS:
            v1 = C;
            v2 = code[++index];

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_D_ADDRESS:
            v1 = D;
            v2 = code[++index];

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_A_NUMBER:
            v1 = A;
            v2 = ++index;

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_B_NUMBER:
            v1 = B;
            v2 = ++index;

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_C_NUMBER:
            v1 = C;
            v2 = ++index;

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_D_NUMBER:
            v1 = D;
            v2 = ++index;

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_A_RB:
            v1 = A;
            v2 = code[B];

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_A_RC:
            v1 = A;
            v2 = code[C];

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_A_RD:
            v1 = A;
            v2 = code[D];

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_B_RA:
            v1 = B;
            v2 = code[A];

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_B_RC:
            v1 = B;
            v2 = code[C];

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_B_RD:
            v1 = B;
            v2 = code[D];

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_C_RA:
            v1 = C;
            v2 = code[A];

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_C_RB:
            v1 = C;
            v2 = code[B];

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_C_RD:
            v1 = C;
            v2 = code[D];

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_D_RA:
            v1 = D;
            v2 = code[A];

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_D_RB:
            v1 = D;
            v2 = code[B];

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_D_RC:
            v1 = D;
            v2 = code[C];

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_A_B:
            v1 = A;
            v2 = B;

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_A_C:
            v1 = A;
            v2 = C;

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_A_D:
            v1 = A;
            v2 = D;

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_B_A:
            v1 = B;
            v2 = A;

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_B_C:
            v1 = B;
            v2 = C;

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_B_D:
            v1 = B;
            v2 = D;

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_C_A:
            v1 = C;
            v2 = A;

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_C_B:
            v1 = C;
            v2 = B;

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_C_D:
            v1 = C;
            v2 = D;

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_D_A:
            v1 = D;
            v2 = A;

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_D_B:
            v1 = D;
            v2 = B;

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.SUB_D_C:
            v1 = D;
            v2 = C;

            code[F] = 0; // reset flags

            if (code[v1] - code[v2] == 0) code[F] |= flag_masks.Z;
            code[v1] -= code[v2];
            break;
        case opcodes.BIT_0:
            v1 = A;
            v2 = 0;

            code[F] = bit_masks[0]; // reset flags

            if (isBitSet(v1, v2)) code[F] |= flag_masks.Z;
            break;
        case opcodes.BIT_1:
            v1 = A;
            v2 = bit_masks[1];

            code[F] = 0; // reset flags

            if (isBitSet(v1, v2)) code[F] |= flag_masks.Z;
            break;
        case opcodes.BIT_2:
            v1 = A;
            v2 = bit_masks[2];

            code[F] = 0; // reset flags

            if (isBitSet(v1, v2)) code[F] |= flag_masks.Z;
            break;
        case opcodes.BIT_3:
            v1 = A;
            v2 = bit_masks[3];

            code[F] = 0; // reset flags

            if (isBitSet(v1, v2)) code[F] |= flag_masks.Z;
            break;
        case opcodes.BIT_4:
            v1 = A;
            v2 = bit_masks[4];

            code[F] = 0; // reset flags

            if (isBitSet(v1, v2)) code[F] |= flag_masks.Z;
            break;
        case opcodes.BIT_5:
            v1 = A;
            v2 = bit_masks[5];

            code[F] = 0; // reset flags

            if (isBitSet(v1, v2)) code[F] |= flag_masks.Z;
            break;
        case opcodes.BIT_6:
            v1 = A;
            v2 = bit_masks[6];

            code[F] = 0; // reset flags

            if (isBitSet(v1, v2)) code[F] |= flag_masks.Z;
            break;
        case opcodes.BIT_7:
            v1 = A;
            v2 = bit_masks[7];

            code[F] = 0; // reset flags

            if (isBitSet(v1, v2)) code[F] |= flag_masks.Z;
            break;
        case opcodes.SWAP_A:
            v1 = code[A] & 0x0F;
            v2 = code[A] & 0xF0;

            v1 = v1 << 4;
            v2 = v2 >> 4;

            code[A] = v1 | v2;
            break;
        case opcodes.SWAP_B:
            v1 = code[B] & 0x0F;
            v2 = code[B] & 0xF0;

            v1 = v1 << 4;
            v2 = v2 >> 4;

            code[B] = v1 | v2;
            break;
        case opcodes.SWAP_C:
            v1 = code[C] & 0x0F;
            v2 = code[C] & 0xF0;

            v1 = v1 << 4;
            v2 = v2 >> 4;

            code[C] = v1 | v2;
            break;
        case opcodes.SWAP_D:
            v1 = code[D] & 0x0F;
            v2 = code[D] & 0xF0;

            v1 = v1 << 4;
            v2 = v2 >> 4;

            code[D] = v1 | v2;
            break;
        case opcodes.OUT:
            code[code[OC]] = code[A];
            code[OC]++;
            break;
        case opcodes.DEL:
            code[code[OC]] = 0;
            code[OC]--;
            break;

    }

    code[PC] = ++index;

    return code;
}