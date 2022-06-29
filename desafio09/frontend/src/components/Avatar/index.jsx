import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { avatarColors, Container, AvatarInitials } from './styles';

function Avatar({ imageUrl, name, size }) {
  const [initials, setInitials] = useState();
  const [color, setColor] = useState('#FFF');

  function getRandomColor(value) {
    const secondDigit = value.toString()[1];
    const colorIndex = Math.floor(
      Math.random() * value <= 10 ? value : secondDigit
    );
    setColor(avatarColors[colorIndex]);
  }

  useMemo(() => {
    const [firstName, lastName] = name.toUpperCase().split(' ');
    setInitials(firstName.charAt(0) + lastName.charAt(0));
    getRandomColor(firstName.length);
  }, [name]);

  return (
    <Container>
      {imageUrl ? (
        <img src={imageUrl} alt={name} />
      ) : (
        <AvatarInitials color={color}>{initials}</AvatarInitials>
      )}
    </Container>
  );
}

/*
 *  propTypes definition
 */

Avatar.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

/*
 *  defaultProps definition
 */

Avatar.defaultProps = {
  size: 'default',
};

export default Avatar;
