using MySql.Data.MySqlClient;
using System.Data;

namespace test_api2.Models
{
    public class PeliculaService
    {
        private string BuildConnection()
        {
            MySqlConnectionStringBuilder builder = new MySqlConnectionStringBuilder();
            builder.Server = "localhost";
            builder.Database = "test";
            builder.UserID = "root";
            builder.Password = "";

            return builder.ConnectionString;
        }

        public bool GuardaPelicula(Pelicula pelicula)
        {
            try
            {
                using (MySqlConnection conexion = new MySqlConnection(BuildConnection()))
                {
                    conexion.Open();

                    using (MySqlCommand com = new MySqlCommand("INSERT INTO pelicula (nombre, genero) VALUES (@nombre, @genero)", conexion))
                    {
                        com.Parameters.Add(new MySqlParameter("@nombre", pelicula.Nombre));
                        com.Parameters.Add(new MySqlParameter("@genero", pelicula.Genero));

                        int rowsAffected = com.ExecuteNonQuery();

                        return rowsAffected > 0;
                    }
                }
            }
            catch (MySqlException e)
            {
                Console.WriteLine(e);
                return false;
            }
        }


        public bool EliminaPelicula(int idPelicula)
        {
            try
            {
                using (MySqlCommand com = new MySqlCommand("DELETE FROM pelicula WHERE IdPelicula = @idPelicula", new MySqlConnection(BuildConnection())))
                {
                    com.Connection.Open();

                    com.Parameters.Add(new MySqlParameter("@idPelicula", idPelicula));

                    int rowsAffected = com.ExecuteNonQuery();

                    return rowsAffected > 0;
                }
            }
            catch (MySqlException e)
            {
                return false;
            }
        }


        public List<Pelicula> LeePeliculas()
        {

            List<Pelicula> peliculas = new List<Pelicula>();

            MySqlConnection conexion = new MySqlConnection();
            conexion.ConnectionString = BuildConnection();

            using (MySqlCommand com = new MySqlCommand("SELECT * FROM pelicula", conexion))
            {
                com.Connection.Open();
                MySqlDataReader reader = com.ExecuteReader();
                while (reader.Read())
                {
                    var pelicula = new Pelicula();
                    pelicula.IdPelicula = Convert.ToInt32(reader["IdPelicula"]);
                    pelicula.Nombre = reader["nombre"].ToString();
                    pelicula.Genero = reader["genero"].ToString();

                    peliculas.Add(pelicula);

                }

                return peliculas;


            }
        }

        public Pelicula BuscarPelicula(int idPelicula)
        {
            Pelicula pelicula = null;

            MySqlConnection conexion = new MySqlConnection();
            conexion.ConnectionString = BuildConnection();

            using (MySqlCommand com = new MySqlCommand("SELECT * FROM pelicula WHERE IdPelicula = @idPelicula", conexion))
            {
                com.Connection.Open();
                com.Parameters.Add(new MySqlParameter("@idPelicula", idPelicula));
                MySqlDataReader reader = com.ExecuteReader();

                if (reader.Read())
                {
                    pelicula = new Pelicula();
                    pelicula.IdPelicula = Convert.ToInt32(reader["IdPelicula"]);
                    pelicula.Nombre = reader["nombre"].ToString();
                    pelicula.Genero = reader["genero"].ToString();
                }
            }

            return pelicula;
        }

        public bool EditarPelicula(int idPelicula, Pelicula pelicula)
        {
            try
            {
                using (MySqlConnection conexion = new MySqlConnection(BuildConnection()))
                {
                    conexion.Open();

                    using (MySqlCommand com = new MySqlCommand("UPDATE pelicula SET nombre = @nombre, genero = @genero WHERE IdPelicula = @idPelicula", conexion))
                    {
                        com.Parameters.Add(new MySqlParameter("@idPelicula", idPelicula));
                        com.Parameters.Add(new MySqlParameter("@nombre", pelicula.Nombre));
                        com.Parameters.Add(new MySqlParameter("@genero", pelicula.Genero));

                        int rowsAffected = com.ExecuteNonQuery();

                        return rowsAffected > 0;
                    }
                }
            }
            catch (MySqlException e)
            {
                Console.WriteLine(e);
                return false;
            }
        }
    }
}
