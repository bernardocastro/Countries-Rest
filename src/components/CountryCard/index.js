import { useEffect, useState } from 'react'
import api from '../../api/api'
import styled from 'styled-components'

const ContentWrapper = styled.div`
display: flex;
flex-wrap: wrap;
`

const CardWrapper = styled.div`
width: 250px;
height: 300px;
display: flex;
flex-direction: column;
margin: 40px 50px 20px 50px
`
const CardImageWrapper = styled.div`
height: 150px;
width: 100%;
`
const CardImage = styled.img`
height: 100%;
width: 100%;
border-radius: 7px 7px 0px 0px;
`

const CardInfo = styled.div`
height: 150px;
width: 100%;
background-color: #FFF;
border-radius: 0px 0px 7px 7px;
`
const InfoTextWrapper = styled.div`
padding: 20px 20px 0px 20px;
`
const InfoTitle = styled.h4`
margin-bottom: 10px
`
const InfoSubtitle = styled.p`
font-size: 12px;
font-weight: 600;
margin-bottom: 7px
`
const InfoSubtitleWrapper = styled.div`
display: flex
`
const InfoSubtitleData = styled.p`
font-size: 12px;
margin-left: 2px
`


const CountryCard = ({ endpoint }) => {

    const [countryData, setCountryData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const resp = await api.get(endpoint)
            setCountryData(resp.data)
        }

        getData()
    }, [])

    return (
        <>
            <ContentWrapper>
                {
                    countryData.map((country, index) => {
                        return (
                            <CardWrapper key={index}>
                                <CardImageWrapper>
                                    <CardImage src={`${country.flags.png}`} />
                                </CardImageWrapper>
                                <CardInfo>
                                    <InfoTextWrapper>
                                        <InfoTitle>
                                            {country.name.common}
                                        </InfoTitle>
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
                                                Capital:
                                            </InfoSubtitle>
                                            <InfoSubtitleData>
                                                {country.capital}
                                            </InfoSubtitleData>
                                        </InfoSubtitleWrapper>
                                    </InfoTextWrapper>
                                </CardInfo>
                            </CardWrapper>
                        )
                    })
                }
            </ContentWrapper>
        </>
    )
}

export default CountryCard