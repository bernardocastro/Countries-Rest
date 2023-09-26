import styled from 'styled-components'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import DarkModeIcon from '@mui/icons-material/DarkMode'

const HeaderContainer = styled.header`
box-shadow: 0 2px 4px 0px rgba(0, 0, 0, 0.1);
padding-inline: 24px;
background-color: ${({ bgColor }) => bgColor};
`

const HeaderContent = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
max-width: 1200px;
margin-inline: auto;
background-color: ${({ bgColor }) => bgColor};
color: ${({ textColor }) => textColor};
`

const HeaderTitle = styled.h2`
font-weight: 900;
font-size: 20px;

@media(max-width: 700px) {
font-size: 15px;
margin: 25px 0px 0px 23px;
  }
`
const Button = styled.button`
border: none;
background: transparent;
margin: 19px 0px 20px 50px;
width: 173px;

&:hover {
    cursor: pointer
};

@media(max-width: 700px) {
margin: 18px 22px 13px 50px;
width: 117px;
  }
`

const ButtonContent = styled.div`
display: flex;
align-items: center;
`

const ButtonText = styled.p`
font-size: 15px;
font-weight: 700;
margin: 0px 0px 1px 4px;
color: ${({ textColor }) => textColor};
`


const Header = ({ toggleDarkMode, isDarkMode }) => {

    const handleDarkModeColors = () => {
        if (isDarkMode) {
            return {
                bgColor: '#2b3945',
                textColor: '#ffffff',
            }
        } else {
            return {
                bgColor: '#ffffff',
                textColor: '#000000',
            }
        }
    }

    const { bgColor, textColor } = handleDarkModeColors()

    return (
        <HeaderContainer bgColor={bgColor}>
            <HeaderContent bgColor={bgColor} textColor={textColor}>
                <HeaderTitle>
                    Where in the world?
                </HeaderTitle>
                <Button disabled onClick={toggleDarkMode}>
                    <ButtonContent>
                        {
                            isDarkMode ? <DarkModeIcon style={{ color: '#FFF' }} /> : <DarkModeOutlinedIcon />
                        }
                        <ButtonText textColor={textColor}>
                            Dark Mode
                        </ButtonText>
                    </ButtonContent>
                </Button>
            </HeaderContent>
        </HeaderContainer>
    )
}

export default Header