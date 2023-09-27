import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import api from '../../api/api'
import styled from 'styled-components'
import Header from '@/components/Header'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const DetailsWrapper = styled.div`
display: flex;
background: ${({ backgroundBgColor }) => backgroundBgColor};
color: ${({ backgroundTextColor }) => backgroundTextColor};
min-height: 90vh;
`

const ButtonWrapper = styled.div`
background: ${({ backgroundBgColor }) => backgroundBgColor};
color: ${({ backgroundTextColor }) => backgroundTextColor};
`

const BackButton = styled.button`
background: ${({ elementBgColor }) => elementBgColor};
color: ${({ elementTextColor }) => elementTextColor};
width: 100px;
height: 43px;
border: none;
border-radius: 6px;
box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
font-size: 15px;
margin: 20px;

&:hover {
  cursor: pointer;
}
`

const DetailsContent = styled.div`
display: flex;
width: 100%; 
height: 100%;
flex-wrap: wrap;
`

const CountryFlag = styled.img`
width: 410px;
height: 280px;
`

const CountryName = styled.h1`

`

const NameContainer = styled.div`

`

const LeftContainer = styled.div`
margin: 20px;
display: flex;
align-items: center;
justify-content: center;
`

const RightContainer = styled.div`
padding: 40px;
margin-bottom: 85px;
`

const InfoContainer = styled.div`
max-height: 155px;
display: flex;
flex-wrap: wrap;
flex-direction: column;

@media(max-width: 760px) {
  flex-wrap: nowrap;
}
`

const InfoSubtitle = styled.p`
font-size: 15px;
font-weight: 600;
margin-bottom: 7px
`

const InfoSubtitleWrapper = styled.div`
display: flex;
margin: 5px 15px 3px 0px;
`

const InfoSubtitleData = styled.p`
font-size: 15px;
margin-left: 2px
`

const BorderCountriesWrapper = styled.div`
display: flex;
margin-top: 50px
`

const BorderCountry = styled.div`

`

const BorderCountryBox = styled.div`
margin: 0px 5px 0px 5px;
padding: 3px;
border: 1px solid black;
border-radius: 5px;
`

const CountryDetails = () => {
  const router = useRouter();
  const { name } = router.query;
  const [countryData, setCountryData] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const getData = async () => {
      if (name) {
        try {
          const resp = await api.get(`/name/${name}`)
          setCountryData(resp.data)
        } catch (error) {
          console.log(error)
        }
      }
    }
    getData()
  }, [name])

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
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <ButtonWrapper backgroundBgColor={backgroundBgColor} backgroundTextColor={backgroundTextColor}>
        <Link href='/'>
          <BackButton elementBgColor={elementBgColor} elementTextColor={elementTextColor}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
              <ArrowBackIcon />
              <p>
                Back
              </p>
            </div>
          </BackButton>
        </Link>
      </ButtonWrapper>
      {
        countryData.map(country => {
          return (
            <DetailsWrapper backgroundBgColor={backgroundBgColor} backgroundTextColor={backgroundTextColor} key={country.name.common}>
              <DetailsContent>
                <LeftContainer>
                  <CountryFlag src={country.flags.png} />
                </LeftContainer>
                <RightContainer>
                  <NameContainer>
                    <CountryName>
                      {country.name.common}
                    </CountryName >
                  </NameContainer>
                  <InfoContainer>
                    <InfoSubtitleWrapper>
                      <InfoSubtitle>
                        Official Name:
                      </InfoSubtitle>
                      <InfoSubtitleData>
                        {country.name.official}
                      </InfoSubtitleData>
                    </InfoSubtitleWrapper>
                    <InfoSubtitleWrapper>
                      <InfoSubtitle>
                        Population:
                      </InfoSubtitle>
                      <InfoSubtitleData>
                        {country.population}
                      </InfoSubtitleData>
                    </InfoSubtitleWrapper>
                    <InfoSubtitleWrapper>
                      <InfoSubtitle>
                        Region:
                      </InfoSubtitle>
                      <InfoSubtitleData>
                        {country.region}
                      </InfoSubtitleData>
                    </InfoSubtitleWrapper>
                    <InfoSubtitleWrapper>
                      <InfoSubtitle>
                        Sub Region:
                      </InfoSubtitle>
                      <InfoSubtitleData>
                        {country.subregion}
                      </InfoSubtitleData>
                    </InfoSubtitleWrapper>
                    <InfoSubtitleWrapper>
                      <InfoSubtitle>
                        Capital:
                      </InfoSubtitle>
                      <InfoSubtitleData>
                        {country.capital}
                      </InfoSubtitleData>
                    </InfoSubtitleWrapper>
                    <InfoSubtitleWrapper>
                      <InfoSubtitle>
                        Top Level Domain:
                      </InfoSubtitle>
                      <InfoSubtitleData>
                        {country.tld}
                      </InfoSubtitleData>
                    </InfoSubtitleWrapper>
                    <InfoSubtitleWrapper>
                      <InfoSubtitle>
                        Area:
                      </InfoSubtitle>
                      <InfoSubtitleData>
                        {country.area}
                      </InfoSubtitleData>
                    </InfoSubtitleWrapper>
                  </InfoContainer>
{/*                   <BorderCountriesWrapper>
                    <InfoSubtitle>
                      Border countries:
                    </InfoSubtitle>
                    <BorderCountryBox>
                      <BorderCountry>
                        Country 1
                      </BorderCountry>
                    </BorderCountryBox>
                    <BorderCountryBox>
                      <BorderCountry>
                        Country 2
                      </BorderCountry>
                    </BorderCountryBox>
                    <BorderCountryBox>
                      <BorderCountry>
                        Country 3
                      </BorderCountry>
                    </BorderCountryBox>
                  </BorderCountriesWrapper> */}
                </RightContainer>
              </DetailsContent>
            </DetailsWrapper>
          )
        })
      }
    </>
  );
};

export default CountryDetails;