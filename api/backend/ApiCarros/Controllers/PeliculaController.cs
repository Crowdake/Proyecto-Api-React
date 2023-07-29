using Microsoft.AspNetCore.Mvc;
//using System.Web.Http;
using test_api2.Models;

namespace test_api2.Controllers
{

    [ApiController]
    [Route("api/[controller]")]


    public class PeliculaController : Controller
    {

        [HttpGet]
        

        public List<Pelicula> BuscarPelicula(int id)
        {
            var peliculaService = new PeliculaService();
            return peliculaService.LeePeliculas();
        }

        [HttpGet("{id:int}")]

        public Pelicula Index(int id)
        {
            PeliculaService peliculas = new PeliculaService();
            return peliculas.BuscarPelicula(id);
        }


        [HttpPost]
        public IActionResult AgregarPelicula([FromBody] Pelicula peli)
        {

            var peliculaService = new PeliculaService();
            var res=peliculaService.GuardaPelicula(peli);

            if (res)
                return Ok("Guardado con éxito");
            else
                return Ok("Error al guardar");

        }

        // POST
        [HttpDelete]

        public IActionResult EliminarPelicula([FromBody] int idPelicula)
        {

            var peliculaService = new PeliculaService();
            var res = peliculaService.EliminaPelicula(idPelicula);

            if (res)
                return Ok("Eliminado con éxito");
            else
                return Ok("Error al eliminar");

        }

        [HttpPut]

        public IActionResult EditarPelicula([FromBody] Pelicula peli, int idPelicula)
        {

            var peliculaService = new PeliculaService();
            var res = peliculaService.EditarPelicula(idPelicula, peli);

            if (res)
                return Ok("Editado con éxito");
            else
                return Ok("Error al editar");

        }


    }
}
