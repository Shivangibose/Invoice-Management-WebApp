package b2bBackend;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


@WebServlet("/AnalyticsView")
public class AnalyticsView extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public AnalyticsView() {
        super();
       
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		// Initialize the database 
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		PrintWriter out = response.getWriter();
		
		
		try {
			Connection con = DBConnection.createConnect();
			
			Statement st = con.createStatement();
			
			
			Gson gson = new GsonBuilder().serializeNulls().create();
			
			

			
			response.setStatus(200);
			out.flush();
		}
		
		catch(SQLException e) {
			out.print(e);
		}
		catch(Exception e) {
			out.print(e);
		}
		
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doGet(request, response);
	}

}
