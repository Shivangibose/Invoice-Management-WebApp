package b2bBackend;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class EditData
 */
@WebServlet("/EditData")
public class EditData extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public EditData() {
        super();
       
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		
		try {
			
			String id=request.getParameter("selected");
			String invoice_cur=request.getParameter("InvoiceCurrency");
			String custPayTerms=request.getParameter("CustomerPaymentTerms");
			Connection con=DBConnection.createConnect();
			
			String query="UPDATE winter_internship SET invoice_currency='"+invoice_cur+"',cust_payment_terms='"+custPayTerms+"' WHERE doc_id="+id;
			
					
			PreparedStatement st=con.prepareStatement(query);
			
			response.setHeader("Access-Control-Allow-Origin","*");
			st.executeUpdate();
			con.close();
		}
		catch (IOException e) {
			e.printStackTrace();
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}

}
