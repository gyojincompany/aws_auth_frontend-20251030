import { useState } from "react";
import "./App.css";
import api from "./axiosConfig";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  //회원 가입
  const signUp = async (e) => {
    try {
      await api.post(
        "/api/auth/signup",
        new URLSearchParams({ username, password })
        //파라미터 넘기기
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
      await api.post(
        "/api/auth/login",
        new URLSearchParams({ username, password })
      );
      setMessage(username + "님 로그인 성공하셨습니다!");
    } catch (err) {
      console.error(err);
      alert("회원 로그인 실패!");
    }
  };

  //회원 로그아웃
  const logout = async () => {
    await api.post("/api/auth/logout");
    setMessage(username + "님 로그아웃 성공하셨습니다!");
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
      <h2>백엔드 응답 : {message}</h2>
    </div>
  );
}

export default App;
