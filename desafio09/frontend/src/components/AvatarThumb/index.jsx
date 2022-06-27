import React, { useState, useMemo, useEffect } from 'react';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';

import { Container } from './styles';

function AvatarThumb({ imageUrl, name, color, size }) {
  const [initials, setInitials] = useState();

  useMemo(() => {
    const [firstName, lastName] = name.toUpperCase().split(' ');
    setInitials(firstName.charAt(0) + lastName.charAt(0));
  }, [name]);

  return (
    <Container>
      {imageUrl ? (
        <img src={imageUrl} alt={name} />
      ) : (
        <div>
          <Avatar name={name} />
          {initials}
        </div>
      )}
    </Container>
  );
}

/*
 *  propTypes definition
 */

AvatarThumb.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

/*
 *  defaultProps definition
 */

AvatarThumb.defaultProps = {
  size: 'default',
};

export default AvatarThumb;
