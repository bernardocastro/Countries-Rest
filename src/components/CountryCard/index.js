import { useEffect, useState } from 'react'
import Link from 'next/link';
import api from '../../api/api'
import styled from 'styled-components'

const CardWrapper = styled.div`
width: 250px;
height: 300px;
display: flex;
flex-direction: column;
margin: 40px 50px 20px 50px;
background: ${({ elementBgColor }) => elementBgColor};
color: ${({ elementTextColor }) => elementTextColor};
-webkit-border-radius: 20px;
 -moz-border-radius: 20px;
 border-radius: 20px;
 -webkit-box-shadow: rgba(0,0,0,0.8) 0px 0 10px;
 -moz-box-shadow: rgba(0,0,0,0.8) 0 0 10px;
 box-shadow: rgba(0,0,0,0.8) 2px 2px 20px 0px;
}
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
background: ${({ elementBgColor }) => elementBgColor};
color: ${({ elementTextColor }) => elementTextColor};
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

const CountryCard = ({ name, capital, population, flag, region, bgColor, textColor }) => {

    return (
        <>
            <CardWrapper bgColor={bgColor} textColor={textColor} key={name}>
                <Link href={`countryDetails/${name}`}>
                    <CardImageWrapper>
                        <CardImage src={flag} />
                    </CardImageWrapper>
                    <CardInfo bgColor={bgColor} textColor={textColor}>
                        <InfoTextWrapper>
                            <InfoTitle>
                                {name}
                            </InfoTitle>
                            <InfoSubtitleWrapper>
                                <InfoSubtitle>
                                    Population:
                                </InfoSubtitle>
                                <InfoSubtitleData>
                                    {population}
                                </InfoSubtitleData>
                            </InfoSubtitleWrapper>
                            <InfoSubtitleWrapper>
                                <InfoSubtitle>
                                    Region:
                                </InfoSubtitle>
                                <InfoSubtitleData>
                                    {region}
                                </InfoSubtitleData>
                            </InfoSubtitleWrapper>
                            <InfoSubtitleWrapper>
                                <InfoSubtitle>
                                    Capital:
                                </InfoSubtitle>
                                <InfoSubtitleData>
                                    {capital}
                                </InfoSubtitleData>
                            </InfoSubtitleWrapper>
                        </InfoTextWrapper>
                    </CardInfo>
                </Link>
            </CardWrapper>
        </>
    )
}

export default CountryCard