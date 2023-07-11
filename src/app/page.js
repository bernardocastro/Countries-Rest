'use client'

import styled from 'styled-components'
import { useEffect, useState } from 'react'
import api from '../api/api'
import CountryCard from '../components/CountryCard/index.js'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import CircularProgress from '@mui/material/CircularProgress'
import Header from '../components/Header/index.js'

const PageWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;

@media(max-width: 700px) {
  display: inline-block
}
`

const PageContent = styled.div`
max-width: 2300px;
width: 100%;
padding: 0 20px;

@media(max-width: 700px) {
  padding: 0;
}
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
  margin: 20px 50px 0px 20px
}
`

const Select = styled.select`
width: 15%;
height: 50px;
border-radius: 7px;
border: none;
padding: 10px;
margin: 40px 50px 20px 50px;

&:focus {
  outline: none
}

@media(max-width: 850px) {
  width: 50%;
  margin: 20px 50px 0px 20px;
}
`

const InputWrapper = styled.div`
width: 100%;
display: flex;
justify-content: space-between;

@media(max-width: 850px) {
  display: flex;
  flex-wrap: wrap;
  align-items: start
}
`

const CardsWrapper = styled.div`
display: flex;
flex-wrap: wrap
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
  const [selectedRegion, setSelectedRegion] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      const resp = await api.get('/all')
      setCountries(resp.data)
      setLoading(false)
    }
    getData()
  }, [])

  const searchResult = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(searchText.toLocaleLowerCase())
  })

  const handleRegionChange = (event) => {
    const region = event.target.value;
    setSelectedRegion(region);
  }

  const filteredCountries = searchResult.filter((country) => {
    if (selectedRegion === '') {
      return true;
    } else {
      return country.region === selectedRegion;
    }
  });
  
  return (
    <main>
      <Header />
      <PageWrapper>
        <PageContent>
          <InputWrapper>
            <SearchBar
              placeholder='Search for a country...'
              type='text'
              value={searchText}
              onChange={({ target }) => setSearchText(target.value)}
            />
            <Select value={selectedRegion} onChange={handleRegionChange}>
              <option value="">All Regions</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </Select>
          </InputWrapper>

          {
            loading ?
              <NoResultsWrapper>
                <CircularProgress color="inherit" />
              </NoResultsWrapper> :
              filteredCountries.length > 0 ?
                <>
                  <CardsWrapper>
                    {
                      filteredCountries.map(country => {
                        return (

                          <CountryCard
                            key={country.id}
                            name={country.name.common}
                            flag={country.flags.png}
                            population={country.population}
                            capital={country.capital}
                            region={country.region}
                          />
                        )
                      })
                    }
                  </CardsWrapper>
                </>
                :
                <NoResultsWrapper>
                  <NoResultsContent>
                    <FlagOutlinedIcon style={{ width: 'auto' }} />
                    <NoResultsTitle>We could not find any countries matching your search</NoResultsTitle>
                    <NoResultsSubtext>please make sure you typed correctly and try again</NoResultsSubtext>
                  </NoResultsContent>
                </NoResultsWrapper>
          }
        </PageContent>
      </PageWrapper>
    </main>
  )
}
