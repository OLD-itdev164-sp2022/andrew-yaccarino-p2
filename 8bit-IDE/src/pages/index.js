import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Table, TableItem, TableRow, TableBody } from '../components/Table';
import { DisplayMemory } from '../components/Display';
import { preload, setup, stop } from '../runtime';

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <form>
      <textarea id="ide-textarea" rows="35" tab-support='true' select-line='true'></textarea>
      <input type='button' id='run-button' value='Run'/>
      <input type='button' id='stop-button' value='Stop'/>
    </form>
    <Table>
      <TableBody>
        <TableRow>
          <TableItem id='display-0'>0</TableItem>
          <TableItem id='display-1'>0</TableItem>
          <TableItem id='display-2'>0</TableItem>
          <TableItem id='display-3'>0</TableItem>
          <TableItem id='display-4'>0</TableItem>
          <TableItem id='display-5'>0</TableItem>
          <TableItem id='display-6'>0</TableItem>
          <TableItem id='display-7'>0</TableItem>
          <TableItem id='display-8'>0</TableItem>
          <TableItem id='display-9'>0</TableItem>
          <TableItem id='display-A'>0</TableItem>
          <TableItem id='display-B'>0</TableItem>
          <TableItem id='display-C'>0</TableItem>
          <TableItem id='display-D'>0</TableItem>
          <TableItem id='display-E'>0</TableItem>
          <TableItem id='display-F'>0</TableItem>
        </TableRow>
      </TableBody>
    </Table>
    {preload(window)}
    {DisplayMemory(window.global_Memory)}
    {
      window.setTimeout(function() {
        window.global_setup = setup;
        window.global_stop = stop;
        document.getElementById('ide-textarea').value ='JP print\n; hello world test\ndata:\nDB \"Hello World!\"\n\nprint:\nLD B, data\nLD C, 12\n\n.loop:\nLD [B], A\nOUT\nINC B\nDEC C\nJZ end\nJP .loop\n\nend:\nHALT';
        document.getElementById('run-button').setAttribute('onclick', 'window.global_setup(window)');
        document.getElementById('stop-button').setAttribute('onclick', 'window.global_stop(window)');
      }, 1)
    }
  </Layout>
)


export default IndexPage
