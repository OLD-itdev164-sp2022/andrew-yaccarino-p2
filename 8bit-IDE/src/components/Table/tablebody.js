import React from 'react';
import { Box } from 'rebass';
import PropTypes from 'prop-types';

export const TableBody = ({ children, ...rest}) => (
    <Box as='tbody' {...rest}>{children}</Box>
);

TableBody.propTypes = {
    children: PropTypes.node.isRequired
};