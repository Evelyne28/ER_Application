using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Web.Services;
using ER_application.Controller;
using ER_application.Models;
using ER_application;
using ER_application.Controller.Interfaces;
using System.Threading;

namespace ER_application.Web_Forms
{
    public partial class ER : System.Web.UI.Page
    {
        static IControllerDispatcher ctrl = new ControllerDispatcher();
        protected void Page_Load(object sender, EventArgs e)
        {
            String username = Session["userName"].ToString();
            welcome.InnerHtml = username;
            //List<Incident> incidents = ctrl.readIncidents();
            //if (!serverExists)
            //{
            //    ServerWorker singleton = ServerWorker.InstanceCreation();
            //    Thread t = new Thread(() => singleton.ExecuteConcurrentServer());
            //    //Thread t = new Thread(new ThreadStart(execute));
            //    t.Start();
            //    //singleton.ExecuteConcurrentServer();
            //}
           // display(incidents);
            //display1();
        }

        [WebMethod]
        public static Models.Ambulance[] GetAmbulances()
        {
            return ctrl.readAmbulances().ToArray();
        }

        [WebMethod]
        public static Models.Incident[] GetIncidents()
        {
            return ctrl.readIncidents().ToArray();
        }

        [WebMethod]
        public static void updateIncident(string id, string gps, string cLocation, string cName,
                                          string pLocation, string pState, string pInfo, string description)
        {
            bool ok = ctrl.updateIncident(Convert.ToInt32(id), gps, cLocation, cName, pLocation, pState, pInfo, description, 0);
        }

        //public void display1()
        //{
        //    HtmlGenericControl ul = new HtmlGenericControl("ul");
        //    ul.Attributes.Add("id", "dispatchAmbList");
        //    for (int i = 1; i < 6; i++)
        //    {
        //        HtmlGenericControl li = new HtmlGenericControl("li");
        //        li.Attributes.Add("id", "dispatchAmb" + i.ToString());
        //        li.InnerText = "Amb" + i.ToString();
        //        Image img = new Image();
        //        img.ImageUrl = "~/Images/Greenlight.gif";
        //        img.Visible = true;
        //        li.Controls.Add(img);
        //        ul.Controls.Add(li);
        //    }
        //    dispatchDiv.Controls.Add(ul);
        //}

        //public void display(List<Incident> incidents)
        //{
        //    foreach (Incident incident in incidents) {
        //        TableRow row = new TableRow();
        //        TableCell cell1 = new TableCell();
        //        cell1.CssClass = "inc" + incident.incidentID;
        //        cell1.Text = incident.dateOfEvent.ToString();
        //        TableCell cell2 = new TableCell();
        //        cell2.CssClass = "inc" + incident.incidentID;
        //        cell2.Text = incident.callerName;
        //        TableCell cell3 = new TableCell();
        //        cell3.CssClass = "inc" + incident.incidentID;
        //        cell3.Text = incident.callerPhone;
        //        TableCell cell4 = new TableCell();
        //        cell4.CssClass = "inc" + incident.incidentID;
        //        //cell4.Text = incident.location;
        //        TableCell cell5 = new TableCell();
        //        cell5.CssClass = "inc" + incident.incidentID;
        //        cell5.Text = incident.description;
        //        TableCell cell6 = new TableCell();
        //        cell6.CssClass = "inc" + incident.incidentID;
        //        cell6.Text = incident.resolved.ToString();
        //        Button b = new Button();
        //        b.ID = "inc" + incident.incidentID + "-button";
        //        b.Text = "Assign Ambulance";
        //        TableCell cell7 = new TableCell();
        //        cell7.CssClass = "inc" + incident.incidentID;
        //        cell7.Controls.Add(b);
        //        row.Cells.Add(cell1);
        //        row.Cells.Add(cell2);
        //        row.Cells.Add(cell3);
        //        row.Cells.Add(cell4);
        //        row.Cells.Add(cell5);
        //        row.Cells.Add(cell6);
        //        row.Cells.Add(cell7);
        //        dispatchTable.Controls.Add(row);
        //    }
        //}

        //public void displayMenu()
        //{
        //    TableRow row = new TableRow();
        //    //row.ID = "amb" + i + "-menu1-row";
        //    TableHeaderCell thCell1 = new TableHeaderCell();
        //    thCell1.ID = "menu1";
        //    thCell1.Text = "Menu1";
        //}

        //protected void Amb_Click(object sender, EventArgs e)
        //{
        //    string id = ((Control)sender).ID;
        //    string script = "<script type=\"text/javascript\">alert('" + id + "');</script>";
        //    ClientScript.RegisterClientScriptBlock(this.GetType(), "Alert", script);
        //    //TableRow row = new TableRow();
        //    //row.ID = "amb" + +"-menu1-row";
        //    //TableHeaderCell thCell1 = new TableHeaderCell();
        //    //thCell1.ID = "menu1";
        //    //thCell1.Text = "Menu1";
        //}

        //protected void btn_Amb_Click(object sender, EventArgs e)
        //{
        //    //display(1, amb1);
        //}

    }
}