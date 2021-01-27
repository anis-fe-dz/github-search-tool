import { ChangeEvent } from 'react';
import { clearList, proceedSearch } from '../../state/search.action';
import { useDispatch } from 'react-redux';
import { GlobalState, searchByEnum } from '../../state/search.types';
import { debounce } from '../../../../helpers/helpers';
/**
 * SearchInput, is the definition of our inpuit component, which will be used to type term of our search.
 */
export function SearchInput(state: GlobalState) {
  const dispatch = useDispatch();
  const triggerSearch = debounce((event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    
    if (event.target.value.length > 2) {
      dispatch(
        proceedSearch(
          event.target.value,
          state.searchType,
          state.searchType === searchByEnum.USERS
            ? !!state.previousSearchesUsers.includes(event.target.value)
            : !!state.previousSearchesRepositories.includes(event.target.value)
        )
      );
    } else {
        dispatch(clearList(event.target.value, state.searchType));
    }
  }, 800);

  return (
    <input
      type='text'
      name=''
      id=''
      placeholder='Start typing to search ..'
      onChange={triggerSearch}
    />
  );
}
