import { _parse } from './parser';
import { register_locations } from '../constants';
import { execCodeAt } from './exec';
import { highlight } from '../components/Display';
import { updateDisplay } from '../components/Display';

function fillExtraSpace(values) {
    let output = new Uint8Array(256).fill(0);
    for (let i = 0; i < values.length; i++) {
        output[i] = values[i];
    }
    return output;
}

export const preload = function(window) {
    window.global_Memory = new Uint8Array(256).fill(0);
}

export const setup = function(window) {
    let code_to_run = window.document.getElementById('ide-textarea').value;

    for (let i = 0; i < 256; i++) { highlight(window.document, i, 'css-vurnku'); }
    if (window.global_intervalID) window.clearInterval(window.global_intervalID);

    preload(window); // reset

    let code = _parse(code_to_run);
    let mem = fillExtraSpace(code.code);
    mem[mem.length - register_locations.SP] = mem.length - 24; // setup stack pointer
    mem[mem.length - register_locations.OC] = mem.length - 16;

    window.global_mapping = code.mapping;
    window.global_Memory = mem;
    window.global_intervalID = window.setInterval(function() {
        let temp = window.global_Memory;
        updateDisplay(temp, document);

        // real update function goes here
        runtime(window);
      }, 100);
}

export const runtime = function(window) {
    let code = window.global_Memory;

    // get program counter
    let pc = code[code.length - register_locations.PC];

    highlight(window.document, pc, 'css-vurnku');

    for (let x in window.global_mapping) { highlight(window.document, parseInt(x), 'hl_instr'); }

    let reply = execCodeAt(code, window);

    // get program counter
    pc = reply[reply.length - register_locations.PC];

    highlight(window.document, pc, 'hl_pc');

    window.global_Memory = reply;
}

export const stop = function(window) {
    window.clearInterval(window.global_intervalID);
}