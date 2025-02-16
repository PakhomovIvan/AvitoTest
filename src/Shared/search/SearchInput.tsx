import { InputText } from 'primereact/inputtext'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { useDebounce } from 'primereact/hooks'
import { SearchInputProps } from './SearchInputProps'
import { useEffect } from 'react'

const SearchInput = ({ onSearch, debounceDelay = 600 }: SearchInputProps) => {
  const [searchQuery, searchQueryValue, setSearchQuery] = useDebounce(
    '',
    debounceDelay
  )

  useEffect(() => {
    onSearch(searchQueryValue)
  }, [onSearch, searchQueryValue])

  return (
    <>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Введите запрос"
        />
      </IconField>
    </>
  )
}

export default SearchInput
