import { useEffect, useState } from "react";
import "./App.css";
import api from "./axiosConfig";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("" || localStorage.getItem("token"));
  //localStorage -> 웹브라우저에서 기본적으로 가지고 있는 저장소

  useEffect(() => {
    if (token) {
      userloginCheck();
    }
  }, []);

  //회원 가입
  const signUp = async (e) => {
    try {
      await api.post(
        "/api/auth/signup",
        { username, password } //JSON 타입으로 넘기기
      );
      setMessage(username + "님 회원가입 성공하셨습니다!");
    } catch (err) {
      console.error(err);
      alert("회원 가입 실패!");
    }
  };

  //회원 로그인
  const login = async (e) => {
    try {
      const res = await api.post("/api/auth/login", { username, password });
      setToken(res.data.token); //로그인 성공 후 받은 토큰 값 저장
      localStorage.setItem("token", res.data.token);
      setMessage(username + "님 로그인 성공하셨습니다!");
    } catch (err) {
      console.error(err);
      alert("회원 로그인 실패!");
    }
  };

  //회원 로그아웃
  const logout = () => {
    localStorage.removeItem("token");
    //토큰 삭제->로그아웃
    setToken(""); //토큰값 초기화
    setUsername(""); //사용자 이름 초기화
    setPassword(""); //비밀번호 초기화

    setMessage(username + "님 로그아웃 성공하셨습니다!");
  };

  //로그인한 사용자 확인
  const userloginCheck = async () => {
    try {
      if (!token) {
        //참이면->로그인 X
        alert("로그인 후 로그인 사용자 정보 확인 가능합니다.");
        return;
      }

      const res = await api.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("현재 로그인한 사용자는 " + res.data.username + "님 입니다.");
      setUsername(res.data.username);
    } catch (err) {
      console.error(err);
      alert("로그인 중인 사용자의 정보를 가져올 수 없습니다!");
    }
  };

  return (
    <div className="App">
      <h1>회원 로그인</h1>
      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={signUp}>회원가입</button>
      <hr />
      <button onClick={login}>로그인</button>
      <button onClick={logout}>로그아웃</button>
      <hr />
      <button onClick={userloginCheck}>로그인한 사용자 확인</button>
      <hr />
      <h2>백엔드 응답 : {message}</h2>
    </div>
  );
}

export default App;
