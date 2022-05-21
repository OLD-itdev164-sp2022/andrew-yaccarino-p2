import React from 'react';
import { Box } from 'rebass';
import PropTypes from 'prop-types';

export const TableHeader = ({ children, ...rest}) => (
    <Box as='th' {...rest}>{children}</Box>
);

TableHeader.propTypes = {
    children: PropTypes.node.isRequired
};