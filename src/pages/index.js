import { Table, TableItem, TableHeader, TableRow } from '../lib/HTML/Table';

import { memory } from '../lib/CPU';

let iterator = 0;

const IndexPage = ({ data }) => (
    <div>
        <Table id="memory-view">
        </Table>
    </div>
);

export default IndexPage;