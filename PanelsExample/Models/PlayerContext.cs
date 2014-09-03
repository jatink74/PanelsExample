using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace PanelsExample.Models {
    
    public class PlayerContext : DbContext  {

        public PlayerContext() : base("PlayerContextDbString") {
            Database.SetInitializer<PlayerContext>(new CreateDatabaseIfNotExists<PlayerContext>());
        }

        public System.Data.Entity.DbSet<PanelsExample.Models.Player> Players { get; set; }
    }
}