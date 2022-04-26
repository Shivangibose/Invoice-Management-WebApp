package b2bBackend;

import java.sql.*;
import java.sql.SQLException;

public class DBConnection {
	
	
	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/grey_goose";
	
	// Database credentials
	static final String USER = "root";
	static final String PASS = "Oushi123*";
	
	public static Connection createConnect() throws Exception {
		
		// Register JDBC Driver
		Class.forName(JDBC_DRIVER);
		
		// Open a connection
		Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);
		
		return conn;
	}
}