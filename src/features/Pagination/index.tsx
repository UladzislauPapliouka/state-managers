'use client';

import { ButtonGroup, IconButton, Pagination } from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

export const TaskPagination = ({
  todosLength,
  handleChangePage
}: {
  todosLength: number;
  handleChangePage: (page: number) => void;
}) => {
  console.log(todosLength);
  return (
    <Pagination.Root count={todosLength} pageSize={2} defaultPage={1}>
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>
        <Pagination.Context>
          {({ pages }) =>
            pages.map((page, index) => {
              console.log(page);

              return page.type === 'page' ? (
                <Pagination.Item
                  onClick={() => handleChangePage(page.value)}
                  key={index + 'page'}
                  {...page}
                >
                  <IconButton variant={{ base: 'ghost', _selected: 'outline' }}>
                    {page.value}
                  </IconButton>
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis key={index} index={index} />
              );
            })
          }
        </Pagination.Context>
        <Pagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};
