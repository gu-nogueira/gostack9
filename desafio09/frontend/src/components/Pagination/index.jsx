import React from 'react';

import { Container } from './styles';

import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const MAX_SHOWABLE_PAGES = 20;

function Pagination({ setPagination, pages, text }) {
  function handleNavigation(page) {
    setPagination(page);
  }
  return (
    <Container>
      {pages && (
        <>
          <h4>
            Total de {text}: {pages.amount}
          </h4>
          {pages.amount > 0 && (
            <div>
              {pages.previous && (
                <button
                  className="button small"
                  onClick={() => handleNavigation(pages.current - 1)}
                >
                  <MdNavigateBefore size={18} />
                </button>
              )}
              <small>
                Página {pages.current} de {pages.last}
              </small>
              {pages.next && (
                <button
                  className="button small"
                  onClick={() => handleNavigation(pages.current + 1)}
                >
                  <MdNavigateNext size={18} />
                </button>
              )}
              {pages.current !== 1 && (
                <button
                  className="button small"
                  onClick={() => handleNavigation(1)}
                >
                  Primeira página
                </button>
              )}
              {pages.current !== pages.last && (
                <button
                  className="button small"
                  onClick={() => handleNavigation(pages.last)}
                >
                  Última página
                </button>
              )}
            </div>
          )}
        </>
      )}
    </Container>
  );
}

export default Pagination;
