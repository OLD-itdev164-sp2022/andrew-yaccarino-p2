import React from 'react';
import { Box } from 'rebass';
import PropTypes from 'prop-types';

export const TableItem = ({ children, ...rest }) => (
    <Box as='td' {...rest}>{children}</Box>
);

TableItem.propTypes = {
    children: PropTypes.node.isRequired
};