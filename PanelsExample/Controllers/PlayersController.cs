using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using PanelsExample.Models;
using System.Web.Http.ModelBinding;

namespace PanelsExample.Controllers
{
    public class PlayersController : ApiController
    {
        private PlayerContext db = new PlayerContext();

        // GET: api/Players
        public IQueryable<Player> GetPlayers()
        {
            return db.Players;
        }

        // GET: api/Players/5
        [ResponseType(typeof(Player))]
        public IHttpActionResult GetPlayer(int id)
        {
            Player player = db.Players.Find(id);
            if (player == null)
            {
                return NotFound();
            }

            return Ok(player);
        }

        // POST: api/Players
        public IHttpActionResult PostPlayers([FromBody] List<Player> model) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            foreach (Player player in model) {
                if (player.Id == 0) {
                    db.Players.Add(player);
                }
                else {
                    db.Players.Attach(player);
                    db.Entry<Player>(player).State = EntityState.Modified;
                }
            }
            db.SaveChanges();
            return Ok();
        }

        // DELETE: api/Players/5
        [ResponseType(typeof(Player))]
        public IHttpActionResult DeletePlayer(int id)
        {
            Player player = db.Players.Find(id);
            if (player == null)
            {
                return NotFound();
            }

            db.Players.Remove(player);
            db.SaveChanges();

            return Ok(player);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PlayerExists(int id)
        {
            return db.Players.Count(e => e.Id == id) > 0;
        }
    }
}