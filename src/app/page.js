'use client'

import styled from 'styled-components'
import { useEffect, useState } from 'react'
import api from '../api/api'
import CountryCard from '../components/CountryCard/index.js'

const Header = styled.div`
width: 100%;
height: 57px;
background-color: #FFF;
box-shadow: 2px 2px #F2F2F2;
display: flex;
justify-content: space-between;
`
const HeaderTitle = styled.h2`
font-weight: bold;
font-size: 17px;
margin: 17px 0px 0px 50px;
`
const SearchBar = styled.input`
width: 40%;
height: 50px;
border: none;
border-radius: 7px;
margin: 40px 0px 0px 50px;
box-shadow: 2px 2px #F2F2F2;
background-color: #FFF;
padding-left:30px;

&:focus {
  outline: none
}

@media(max-width: 850px) {
  width: 100%;
  margin: 40px 50px 0px 50px
}
`
const InputWrapper = styled.div`
width: 100%;

@media(max-width: 850px) {
  display: flex;
  justify-content: center
}
`

export default function Home() {

  const [searchText, setSearchText] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const getData = async () => {
      const resp = await api.get('/all')
      setCountries(resp.data)
    }
    getData()
  }, [])
  
  console.log(countries, 'RESP')

  const filteredCountries = countries.filter((country)=>{
    return country.name.common.toLowerCase().includes(searchText.toLocaleLowerCase())
  })


  return (
    <main>
      <Header>
        <HeaderTitle>
          Where in the world?
        </HeaderTitle>
      </Header>
      <InputWrapper>
        <SearchBar
          placeholder='Search for a country...'
          type='text'
          value={searchText}
          onChange={({ target }) => setSearchText(target.value)}
        />
      </InputWrapper>
      <CountryCard
        endpoint={'/all'}
        countryData={searchText ? filteredCountries : countries}
      />
    </main>
  )
}
