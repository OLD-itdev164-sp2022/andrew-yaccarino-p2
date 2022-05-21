import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Table, TableItem, TableHeader, TableRow, TableBody } from '../components/Table';

let memory = new Int8Array(256).fill(0);

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Table id="memory-view">
      <TableBody>
        <TableRow id="TR-0">
          <TableItem>Test</TableItem>
        </TableRow>
        <TableRow id="TR-1">
          <TableItem>Test</TableItem>
        </TableRow>
        <TableRow id="TR-2">
          <TableItem>Test</TableItem>
        </TableRow>
        <TableRow id="TR-3">
          <TableItem>Test</TableItem>
          </TableRow>
        <TableRow id="TR-4">
          <TableItem>Test</TableItem>
        </TableRow>
        <TableRow id="TR-5">
          <TableItem>Test</TableItem>
        </TableRow>
        <TableRow id="TR-6">
          <TableItem>Test</TableItem>
        </TableRow>
        <TableRow id="TR-7">
          <TableItem>Test</TableItem>
        </TableRow>
        <TableRow id="TR-8">
          <TableItem>Test</TableItem>
        </TableRow>
        <TableRow id="TR-9">
          <TableItem>Test</TableItem>
        </TableRow>
        <TableRow id="TR-A">
          <TableItem>Test</TableItem>
        </TableRow>
        <TableRow id="TR-B">
          <TableItem>Test</TableItem>
        </TableRow>
        <TableRow id="TR-C">
          <TableItem>Test</TableItem>
        </TableRow>
        <TableRow id="TR-D">
          <TableItem>Test</TableItem>
        </TableRow>
        <TableRow id="TR-E">
          <TableItem>Test</TableItem>
        </TableRow>
        <TableRow id="TR-F">
          <TableItem>Test</TableItem>
        </TableRow>
      </TableBody>
    </Table>
  </Layout>
)

export default IndexPage
