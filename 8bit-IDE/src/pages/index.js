import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Table, TableItem, TableHeader, TableRow, TableBody } from '../components/Table';
import { DisplayMemory, updateDisplay } from '../components/Display';

let memory = new Int8Array(256).fill(0);

function _storage(key) {
  return Uint8Array.from(sessionStorage.getItem(key).split(','));
}

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    {
      sessionStorage.setItem('Memory', new Uint8Array(256).fill(0))
    }
    {DisplayMemory(_storage('Memory'))}
    {
      // if this thing is called I wonder if I can do code injection to get an update function
      window.setInterval(function() {
        let temp = _storage('Memory');
        updateDisplay(temp, document);

        // real update function goes here

        // proof of concept (remove this later)
        temp[Math.round(Math.random() * 255)] = Math.round(Math.random() * 255);
        sessionStorage.setItem('Memory', temp);
      }, 1)
    }
  </Layout>
)


export default IndexPage
