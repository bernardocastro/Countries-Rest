'use client'

import styled from 'styled-components'
import { useEffect, useState } from 'react'
import api from '../api/api'
import CountryCard from '../components/CountryCard/index.js'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import CircularProgress from '@mui/material/CircularProgress'
import Header from '../components/Header/index.js'
import Head from 'next/head';
import Layout from '../app/layout';


const PageWrapper = styled.div`
max-width: 1200px;
margin-inline: auto; 
margin-top: 16px;
display: flex;
gap: 64px;
flex-wrap: wrap;
justify-content: center;
background: ${({ backgroundBgColor }) => backgroundBgColor};
color: ${({ backgroundTextColor }) => backgroundTextColor};

@media(max-width: 1200px) {
  display: inline-block;
  width: 100%
}
`

const PageContent = styled.div`
max-width: 2300px;
width: 100%;
padding: 0 20px;

@media(max-width: 1200px) {
  padding: 0;
}
`

const SearchBar = styled.input`
width: 40%;
height: 50px;
border: none;
border-radius: 7px;
margin-top: 40px;
box-shadow: ${({ theme }) => (theme === 'dark' ? 'none' : '2px 2px #F2F2F2')};
padding: 9px 4px 9px 40px;
background: ${({ elementBgColor }) => elementBgColor} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat 13px center;
color: ${({ elementTextColor }) => elementTextColor};
::placeholder {
  color: deeppink;
  font-size: 5rem;
  text-transform: uppercase;
}

&:focus {
  outline: none
}

@media(max-width: 1200px) {
  width: 100%;
  margin: 20px 50px 0px 20px
}
`

const Select = styled.select`
flex-basis: calc(15% - 10px);
height: 50px;
border-radius: 7px;
border: none;
padding: 10px;
margin: 40px 50px 20px 5px;;
background:  ${({ elementBgColor }) => elementBgColor};
color: ${({ elementTextColor }) => elementTextColor};

&:focus {
  outline: none
}

&:hover {
  cursor: pointer
}

@media (max-width: 1200px) {
  width: 100%;
  flex-basis: 100%;
  margin: 20px 50px 0px 20px;
}
`

const InputWrapper = styled.div`
width: 100%;
display: flex;
justify-content: space-between;

@media(max-width: 1200px) {
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
  const [isDarkMode, setIsDarkMode] = useState(false)

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
    const region = event.target.value
    setSelectedRegion(region)
  }

  const filteredCountries = searchResult.filter((country) => {
    if (selectedRegion === '') {
      return true
    } else {
      return country.region === selectedRegion;
    }
  })

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleElementsColors = () => {
    if (isDarkMode) {
      return {
        elementBgColor: '#2b3945',
        elementTextColor: '#FFF',
      }
    } else {
      return {
        elementBgColor: '#FFF',
        elementTextColor: '#000000',
      }
    }
  }

  const handleBackgroundColors = () => {
    if (isDarkMode) {
      return {
        backgroundBgColor: '#202C37',
        backgroundTextColor: '#FFF',
      }
    } else {
      return {
        backgroundBgColor: '#FAFAFA',
        backgroundTextColor: '#000000',
      }
    }
  }

  const { elementBgColor, elementTextColor } = handleElementsColors()
  const { backgroundBgColor, backgroundTextColor } = handleBackgroundColors()


  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz@6..12&display=swap" rel="stylesheet" />
      </Head>
      <main>
        <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <PageWrapper backgroundBgColor={backgroundBgColor} backgroundTextColor={backgroundTextColor} >
          <InputWrapper>
            <SearchBar
              placeholder='Search for a country...'
              type='search'
              value={searchText}
              onChange={({ target }) => setSearchText(target.value)}
              elementBgColor={elementBgColor}
              elementTextColor={elementTextColor}
              theme={isDarkMode ? 'dark' : 'light'}
            />
            <Select value={selectedRegion} onChange={handleRegionChange} elementBgColor={elementBgColor} elementTextColor={elementTextColor}>
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
                            bgColor={elementBgColor}
                            textColor={elementTextColor}
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
        </PageWrapper>
      </main>
    </>

  )
}
