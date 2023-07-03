'use client'

import styled from 'styled-components'
import { useEffect, useState } from 'react'
import api from '../api/api'
import CountryCard from '../components/CountryCard/index.js'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';

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
const NoResultsWrapper = styled.div`
display: flex;
justify-content: center;
margin-top: 50px
`
const NoResultsContent = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
padding: 10px
`
const NoResultsTitle = styled.h4`

`
const NoResultsSubtext = styled.p`
font-size: 12px
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

  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(searchText.toLocaleLowerCase())
  })

  console.log(filteredCountries, 'FILTRADOS')

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
      {
        filteredCountries.length > 0 ?
          <CountryCard
            endpoint={'/all'}
            countryData={searchText ? filteredCountries : countries}
          /> :
          <NoResultsWrapper>
            <NoResultsContent>
              <FlagOutlinedIcon style={{ width: 'auto' }} />
              <NoResultsTitle>We couldn't find any countries matching your search</NoResultsTitle>
              <NoResultsSubtext>please make sure you typed correctly and try again</NoResultsSubtext>
            </NoResultsContent>
          </NoResultsWrapper>
      }
    </main>
  )
}
