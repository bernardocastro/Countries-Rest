import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import api from '../../api/api'
import styled from 'styled-components'
import Header from '@/components/Header'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const DetailsWrapper = styled.div`
display: flex;
`

const BackButton = styled.button`
background: #FFF;
color: #000;
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
`

const CountryFlag = styled.img`
width: 410px;
height: 280px;
`

const CountryName = styled.h1`

`

const LeftContainer = styled.div`
margin: 20px
`

const RightContainer = styled.div`
padding: 40px
`

const InfoTextWrapper = styled.div`
padding: 20px 20px 0px 0px;
`

const InfoSubtitle = styled.p`
font-size: 15px;
font-weight: 600;
margin-bottom: 7px
`

const InfoSubtitleWrapper = styled.div`
display: flex
`

const InfoSubtitleData = styled.p`
font-size: 15px;
margin-left: 2px
`

const CountryDetails = () => {
  const router = useRouter();
  const { name } = router.query;
  const [countryData, setCountryData] = useState([])

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

  return (
    <>
      <Header />
      <Link href='/'>
        <BackButton>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <ArrowBackIcon />
            <p>
              Back
            </p>
          </div>
        </BackButton>
      </Link>
      {
        countryData.map(country => {
          return (
            <DetailsWrapper key={country.name.common}>
              <DetailsContent>
                <LeftContainer>
                  <CountryFlag src={country.flags.png} />
                </LeftContainer>
                <RightContainer>
                  <InfoTextWrapper>
                    <CountryName>
                      {country.name.common}
                    </CountryName >
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


                  </InfoTextWrapper>
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