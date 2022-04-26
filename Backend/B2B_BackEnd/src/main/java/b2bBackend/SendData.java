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


@WebServlet("/SendData")
public class SendData extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public SendData() {
        super();
       
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		// Initialize the database 
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		PrintWriter out = response.getWriter();
		
		String sort=request.getParameter("sort")==null?"sl_no":request.getParameter("sort");      
		String order=request.getParameter("dsort")==null?"ASC":request.getParameter("dsort");
		
		try {
			Connection con = DBConnection.createConnect();
			
			Statement st = con.createStatement();
			String sql_statement = "SELECT * FROM winter_internship WHERE is_deleted = 0 ORDER BY "+sort+" "+order;
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
				in.setDocumentCreateDate1(rs.getString("document_create_date1"));
				in.setDueInDate(rs.getString("due_in_date"));
				in.setInvoiceCurrency(rs.getString("invoice_currency"));
				in.setDocumentType(rs.getString("document_type"));
				in.setPostingID(rs.getInt("posting_id"));
				in.setAreaBusiness(rs.getString("area_business"));
				in.setTotalOpenAmount(rs.getFloat("total_open_amount"));
				in.setBaselineCreateDate(rs.getString("baseline_create_date"));
				in.setCustPaymentTerms(rs.getString("cust_payment_terms"));
				in.setInvoiceID(rs.getLong("invoice_id"));
				in.setIsOpen(rs.getInt("isOpen"));
				in.setIsDeleted(rs.getInt("is_deleted"));
				
				System.out.println(in);
				
				data.add(in);
			}
			
			Gson gson = new GsonBuilder().serializeNulls().create();
			String invoice= gson.toJson(data);
			

			out.print(invoice);
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
