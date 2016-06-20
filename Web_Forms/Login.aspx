<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="ER_application.Web_Forms.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Log in</title>
    <meta http-equiv="content-Type" content="text/html; charset=utf-8"/>
    <link rel="stylesheet" href="~/CSS/Login.css"/>
    <%--<script type="text/javascript" src="../Others/jquery-2.2.0.js"></script>--%> 
</head>
<body>
   <%-- <div id="outer">
        <div id="univ"> Universitatea Babeș-Bolyai</div>
        <div id="facultate">Facultatea de Matematică și Informatică</div>
    </div>--%>
    <section class="container">
    <div class="inner">
      <h1>Autentificare</h1>
      <form class="login" runat="server">
        <div id="divUser"><input type="text" id="userName" name="userName" placeholder="Utilizator" required/></div>
          <br />
        <div id="divPassword"><input type="password" id="userPassword" name="userPassword" placeholder="Parolă" required/></div>
          <br />
        <div id="divLogIn"><asp:Button id="Submit" Text="Autentificare" runat="server" onclick="btn_login_Click"></asp:Button></div>
      </form>
    </div>
  </section>
</body>
</html>
