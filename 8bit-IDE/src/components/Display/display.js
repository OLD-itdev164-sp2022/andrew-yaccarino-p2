import { Table, TableRow, TableBody, TableItem } from '../Table';
import React from 'react';

function _generate_row(arr, id) {
    return (
        <TableRow>
            <TableItem id={`TD-${id}0`}>{arr[ 0].toString(16)}</TableItem>
            <TableItem id={`TD-${id}1`}>{arr[ 1].toString(16)}</TableItem>
            <TableItem id={`TD-${id}2`}>{arr[ 2].toString(16)}</TableItem>
            <TableItem id={`TD-${id}3`}>{arr[ 3].toString(16)}</TableItem>
            <TableItem id={`TD-${id}4`}>{arr[ 4].toString(16)}</TableItem>
            <TableItem id={`TD-${id}5`}>{arr[ 5].toString(16)}</TableItem>
            <TableItem id={`TD-${id}6`}>{arr[ 6].toString(16)}</TableItem>
            <TableItem id={`TD-${id}7`}>{arr[ 7].toString(16)}</TableItem>
            <TableItem id={`TD-${id}8`}>{arr[ 8].toString(16)}</TableItem>
            <TableItem id={`TD-${id}9`}>{arr[ 9].toString(16)}</TableItem>
            <TableItem id={`TD-${id}A`}>{arr[10].toString(16)}</TableItem>
            <TableItem id={`TD-${id}B`}>{arr[11].toString(16)}</TableItem>
            <TableItem id={`TD-${id}C`}>{arr[12].toString(16)}</TableItem>
            <TableItem id={`TD-${id}D`}>{arr[13].toString(16)}</TableItem>
            <TableItem id={`TD-${id}E`}>{arr[14].toString(16)}</TableItem>
            <TableItem id={`TD-${id}F`}>{arr[15].toString(16)}</TableItem>
        </TableRow>
    )
}

export const DisplayMemory = (arr, width) => (
    // why?
    <Table id="memory-view">
        <TableBody>
            {_generate_row(arr.subarray(  0,  16),'0')}
            {_generate_row(arr.subarray( 16,  32),'1')}
            {_generate_row(arr.subarray( 32,  48),'2')}
            {_generate_row(arr.subarray( 48,  64),'3')}
            {_generate_row(arr.subarray( 64,  80),'4')}
            {_generate_row(arr.subarray( 80,  96),'5')}
            {_generate_row(arr.subarray( 96, 112),'6')}
            {_generate_row(arr.subarray(112, 128),'7')}
            {_generate_row(arr.subarray(128, 144),'8')}
            {_generate_row(arr.subarray(144, 160),'9')}
            {_generate_row(arr.subarray(160, 176),'A')}
            {_generate_row(arr.subarray(176, 192),'B')}
            {_generate_row(arr.subarray(192, 208),'C')}
            {_generate_row(arr.subarray(208, 224),'D')}
            {_generate_row(arr.subarray(224, 240),'E')}
            {_generate_row(arr.subarray(240, 256),'F')}
        </TableBody>
    </Table>
)