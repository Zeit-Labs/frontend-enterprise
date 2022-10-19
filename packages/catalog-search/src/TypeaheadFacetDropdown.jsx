import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { Input } from '@edx/paragon';
import { SearchContext } from './SearchContext';
import FacetDropdown from './FacetDropdown';
import { dropdownContainerDataCapture } from './data/utils';

const TypeaheadFacetDropdown = ({
  title,
  items,
  isBold,
  options,
  searchForItems,
  showBadge,
  ...props
}) => {
  const handleSearch = debounce((value) => {
    // when user is erasing the input and input is empty we need to reset the filtering
    if (value.length >= options.minLength || value.length === 0) {
      searchForItems(value);
    }
  }, 200);

  const transformMenuOptions = (menuOptions) => (
    <>
      <div className="pr-2 pl-2 pb-2">
        <Input
          autoFocus
          type="search"
          className="typeahead-dropdown-input"
          onChange={event => handleSearch(event.currentTarget.value)}
          placeholder={options.placeholder}
          aria-label={options.ariaLabel}
        />
      </div>
      <div className="typeahead-dropdown-menu-scrollable-items">
        {menuOptions}
      </div>
    </>
  );
  const { refinements, enterpriseUUID } = useContext(SearchContext);
  return (
    <FacetDropdown
      items={transformMenuOptions(items)}
      title={title}
      isBold={isBold}
      className="typeahead"
      onChangeAction={() => dropdownContainerDataCapture([], true, showBadge, refinements, enterpriseUUID)}
      {...props}
    />
  );
};

TypeaheadFacetDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  isBold: PropTypes.bool.isRequired,
  options: PropTypes.shape({
    placeholder: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string.isRequired,
    minLength: PropTypes.number.isRequired,
  }).isRequired,
  searchForItems: PropTypes.func.isRequired,
  showBadge: PropTypes.bool.isRequired,
};

export default TypeaheadFacetDropdown;
