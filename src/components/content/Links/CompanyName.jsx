import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'object-path';
import ObjectValue from '../Elements/ObjectValue';
import Link from '../Link';

const propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string,
  }),
  linkAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.string,
};

const defaultProps = {
  children: undefined,
  collapsible: true,
  content: {},
  linkAttrs: {},
  tag: 'span',
};

const CompanyNameLink = ({
  children,
  content,
  linkAttrs,
  ...attrs
}) => (
  <ObjectValue path="company.name" obj={content} {...attrs}>
    {(value) => {
      const canonicalPath = get(content, 'company.canonicalPath');
      if (!canonicalPath) return null;
      return (
        <Link canonicalPath={canonicalPath} value={value} {...linkAttrs}>
          {children}
        </Link>
      );
    }}
  </ObjectValue>
);

CompanyNameLink.displayName = 'Content/Links/CompanyName';
CompanyNameLink.propTypes = propTypes;
CompanyNameLink.defaultProps = defaultProps;

export default CompanyNameLink;
