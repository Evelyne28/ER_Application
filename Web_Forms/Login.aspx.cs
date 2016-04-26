using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ER_application.Controller;
using ER_application.Models;

namespace ER_application.Web_Forms
{
    public partial class Login : System.Web.UI.Page
    {
        public ControllerUser controller;

        protected void Page_Load(object sender, EventArgs e)
        {
        }

        protected void btn_login_Click(object sender, EventArgs e)
        {
            controller = new ControllerUser();
            string userName = "", password = "";
            if (!string.IsNullOrEmpty(Request.Form["userName"]))
            {
                userName = Request.Form["userName"];
            }

            if (!string.IsNullOrEmpty(Request.Form["userPassword"]))
            {
                password = Request.Form["userPassword"];
            }
            try
            {
                int role = controller.findUser(userName, password);

                //int rol = controller.findUserIdentity(u);
                //in functie de rolul gasit se afiseaza pagina corespunzatoare
                if (role == 0)
                {
                    Session["userName"] = userName;
                    Session["userPassword"] = password;
                    Response.Redirect("Admin.aspx");
                }
                else if (role == 1)
                {
                    Session["userName"] = userName;
                    Session["userPassword"] = password;
                    Response.Redirect("ER.aspx", false);
                }
                else if (role == 2)
                {
                    Session["userName"] = userName;
                    Session["userPassword"] = password;
                    Response.Redirect("Ambulance.aspx");
                }


                else if (role == 3)
                {
                    Session["userName"] = userName;
                    Session["userPassword"] = password;
                    Response.Redirect("Ambulance.aspx");
                }

            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine("baaaaaaaaaa");
                System.Diagnostics.Debug.WriteLine(ex.Message);
                var message = "Userul sau parola sunt introduse gresit!";
                string script = "<script type=\"text/javascript\">alert('" + message + "');</script>";
                ClientScript.RegisterClientScriptBlock(this.GetType(), "Alert", script);
            }
        }
    }
}