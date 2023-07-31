using Microsoft.AspNetCore.Mvc;
using ApiCarros.Models;
using System.Collections.Generic;

namespace ApiCarros.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MarcaController : ControllerBase
    {
        [HttpGet]
        public List<Marca> ObtenerMarcas()
        {
            var marcaService = new MarcaService();
            return marcaService.LeerMarcas();
        }

        [HttpGet("{id:int}")]
        public Marca ObtenerMarca(int id)
        {
            var marcaService = new MarcaService();
            return marcaService.BuscarMarca(id);
        }

        [HttpPost]
        public IActionResult AgregarMarca([FromBody] Marca marca)
        {
            var marcaService = new MarcaService();
            var res = marcaService.GuardarMarca(marca);

            if (res)
                return Ok("Guardado con éxito");
            else
                return Ok("Error al guardar");
        }

        [HttpDelete("{id:int}")]
        public IActionResult EliminarMarca(int id)
        {
            var marcaService = new MarcaService();
            var res = marcaService.EliminarMarca(id);
            if (res)
                return Ok("Eliminado con éxito");
            else
                return Ok("Error al eliminar");
        }

        [HttpPut("{id:int}")]
        public IActionResult EditarMarca(int id, [FromBody] Marca marca)
        {
            var marcaService = new MarcaService();
            var res = marcaService.EditarMarca(id, marca);

            if (res)
                return Ok("Editado con éxito");
            else
                return Ok("Error al editar");
        }
    }
}