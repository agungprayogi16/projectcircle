/** @format */

import { useEffect, useState, ReactNode } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";
import Main from "@/layout/Main";
import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import ProfilePage from "@/pages/ProfilePage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import DetailPage from "@/pages/DetailPage";
import EditProfilePage from "@/pages/EditProfilePage";
import { API } from "@/utils/api";
import NotFound from "@/pages/NotFound";

export default function Router() {
  const [checkAuthFinish, setCheckAuthFinish] = useState<boolean>(true);

  async function authCheck() {
    try {
      await API.get("/check", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
    } catch (error) {
      localStorage.clear();
      return <Navigate to='/login' />;
    } finally {
      setCheckAuthFinish(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      authCheck();
    } else {
      setCheckAuthFinish(false);
    }
  }, []);

  function IsLogged({ children }: { children: ReactNode }) {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      return children;
    }
    return <Navigate to='/login' />;
  }

  function IsNotLogged({ children }: { children: ReactNode }) {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      return children;
    }
    return <Navigate to='/' />;
  }

  return (
    <>
      {checkAuthFinish && (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          width={"100vw"}
          height={"100vh"}>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            width={"70px"}
            height={"70px"}
          />
        </Flex>
      )}

      {!checkAuthFinish && (
        <BrowserRouter>
          <Routes>
            <Route path='/'>
              <Route
                index
                element={
                  <IsLogged>
                    <Main>
                      <HomePage />
                    </Main>
                  </IsLogged>
                }
              />
            </Route>
            <Route path='/reply/:threadId'>
              <Route
                index
                element={
                  <IsLogged>
                    <Main>
                      <DetailPage />
                    </Main>
                  </IsLogged>
                }
              />
            </Route>
            <Route path='/search'>
              <Route
                index
                element={
                  <IsLogged>
                    <Main>
                      <SearchPage />
                    </Main>
                  </IsLogged>
                }
              />
            </Route>
            <Route path='/profile/:userId'>
              <Route
                index
                element={
                  <IsLogged>
                    <Main>
                      <ProfilePage />
                    </Main>
                  </IsLogged>
                }
              />
            </Route>
            <Route path='/my-profile/:userId'>
              <Route
                index
                element={
                  <IsLogged>
                    <Main>
                      <ProfilePage />
                    </Main>
                  </IsLogged>
                }
              />
            </Route>
            <Route path='/edit-profile'>
              <Route
                index
                element={
                  <IsLogged>
                    <Main>
                      <EditProfilePage />
                    </Main>
                  </IsLogged>
                }
              />
            </Route>
            <Route path='/register'>
              <Route
                index
                element={
                  <IsNotLogged>
                    <RegisterPage />
                  </IsNotLogged>
                }
              />
            </Route>
            <Route path='/login'>
              <Route
                index
                element={
                  <IsNotLogged>
                    <LoginPage />
                  </IsNotLogged>
                }
              />
            </Route>
            <Route
              path='*'
              element={<NotFound />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}
