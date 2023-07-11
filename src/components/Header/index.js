import styled from 'styled-components'

const HeaderBar = styled.div`
width: 100%;
height: 57px;
background-color: #FFF;
box-shadow: 2px 2px #F2F2F2;
display: flex;
`

const HeaderTitle = styled.h2`
font-weight: bold;
font-size: 17px;
margin: 17px 0px 0px 50px;
`

const Header = () => {
    return (
        <HeaderBar>
            <HeaderTitle>
                Where in the world?
            </HeaderTitle>
        </HeaderBar>
    )
}

export default Header