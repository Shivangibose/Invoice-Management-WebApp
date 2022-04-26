package b2bBackend;

import java.io.IOException;
import java.io.PrintWriter;
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

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet implementation class SearchData
 */
@WebServlet("/SearchData")

public class SearchData extends HttpServlet
{
	
	public SearchData() {
        super();
            }
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
	
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		PrintWriter out = response.getWriter();
		
		try {
			Connection conn = DBConnection.createConnect();
			
			String search = request.getParameter("search");
			
			Statement st = conn.createStatement();
			String sql_statement="";
			if(search.length()>8)
			{
        	 sql_statement = "SELECT * FROM winter_internship WHERE is_deleted=0 AND cust_number LIKE '" + search+"'ORDER BY sl_no ASC"; 
			}
			else
			{
				 sql_statement = "SELECT * FROM winter_internship WHERE is_deleted=0 AND cust_number LIKE '" + search+"%1' ORDER BY sl_no ASC"; 
			}
			ResultSet rs = st.executeQuery(sql_statement);
			
			ArrayList<Invoice> data = new ArrayList<>();
			while(rs.next()) {
				Invoice in = new Invoice();
				in.setSerialNo(rs.getInt("sl_no"));
				in.setBusinessCode(rs.getString("business_code"));
				in.setCustNumber(rs.getString("cust_number"));
				in.setClearDate(rs.getString("clear_date") == null ? "" : rs.getString("clear_date").substring(0, 10));
				in.setBuisnessYear(rs.getString("buisness_year"));
				in.setDocID(rs.getLong("doc_id"));
				in.setPostingDate(rs.getString("posting_date"));
				in.setDocumentCreateDate(rs.getString("document_create_date"));
				in.setDueInDate(rs.getString("due_in_date"));
				in.setInvoiceCurrency(rs.getString("invoice_currency"));
				in.setDocumentType(rs.getString("document_type"));
				in.setPostingID(rs.getInt("posting_id"));
				in.setTotalOpenAmount(rs.getFloat("total_open_amount"));
				in.setBaselineCreateDate(rs.getString("baseline_create_date"));
				in.setCustPaymentTerms(rs.getString("cust_payment_terms"));
				in.setInvoiceID(rs.getLong("invoice_id"));
				in.setIsOpen(rs.getInt("isOpen"));
				
				
				data.add(in);
			}
			
			Gson gson = new GsonBuilder().serializeNulls().create();
			String invoices = gson.toJson(data);
			
			out.print(invoices);
			response.setStatus(200);
			out.flush();
		}
		catch(ClassNotFoundException e) {
			e.printStackTrace();
		}
		catch(SQLException e) {
			e.printStackTrace();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
	

