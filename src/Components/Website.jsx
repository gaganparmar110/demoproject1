// CORE
import React from 'react';
import { useSelector } from 'react-redux';

// USER DEFINED
import Routes from "Routes/Route";
import Sidebar  from "./Commons/Sidebar/Sidebar";
import Header  from "./Commons/Header/Header";

//STYLES
import { RightContentWrapper, ContentWrapper, LayoutStyled } from "./Website.style";

function Website(props){
    const isLoggedIn = useSelector(state => state.Auth.isLoggedIn);
	return(
		<React.Fragment>
			<LayoutStyled>
                {
                    isLoggedIn ?
                    <LoggedInComponents />
                    :
                    <Routes />
                }
            </LayoutStyled>
		</React.Fragment>
	)
}

function LoggedInComponents(props) {
    return (
        <>
            <Sidebar />
            <RightContentWrapper isLoggedIn={true}>
                <Header />
                <ContentWrapper isLoggedIn={true}>
                    <Routes />
                </ContentWrapper>

            </RightContentWrapper>
        </>
    )
}

export default Website;