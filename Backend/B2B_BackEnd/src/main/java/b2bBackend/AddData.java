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
 * Servlet implementation class AddData
 */
@WebServlet("/AddData")
public class AddData extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public AddData() {
        super();
       
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		
		try {
			
			int slNo=0;
			Connection con = DBConnection.createConnect();
			String query="SELECT COUNT(*) AS TOTAL FROM winter_internship";
			Statement s1=con.createStatement();
			ResultSet rs=s1.executeQuery(query);
			
			while(rs.next()) {
				slNo=rs.getInt("TOTAL")+1;
			}
			
			String sql_statement = "INSERT INTO winter_internship (sl_no,business_code, cust_number, clear_date, buisness_year, doc_id, posting_date,document_create_date,"
					+ "document_create_date1, due_in_date,invoice_currency,document_type,posting_id,area_business,total_open_amount,baseline_create_date,"
					+ "cust_payment_terms,invoice_id,isOpen,aging_bucket,is_deleted) VALUES ("+slNo+",'"+request.getParameter("buisnessCode")+"',"+request.getParameter("CustomerNum")+",'"
					+  request.getParameter("ClearDate")+"',"+request.getParameter("BuisnessYear")+","+request.getParameter("DocID")+",'"+request.getParameter("PostingDate")+"','"+request.getParameter("DocumentCreateDate")+"','"
					+  request.getParameter("DocumentCreateDate")+"','"+request.getParameter("DueDate")+"','"+request.getParameter("InvoiceCur")
					+ "','"+request.getParameter("DocumentType")+"',"+request.getParameter("PostingID")+",NULL,"+request.getParameter("TotalOpenAmt")+",'"
					+  request.getParameter("BaseLineDate")+"','"+request.getParameter("CustomerPayTerms")+"',"+request.getParameter("invoiceID")+","
					+ "1,NULL,0 )";
			
			PreparedStatement st = con.prepareStatement(sql_statement);
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
