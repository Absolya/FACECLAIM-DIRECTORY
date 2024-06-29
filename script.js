    $(document).ready(function() {
        // Initialize Isotope with sorting by name
        var $gallery = $('#gallery').isotope({
            itemSelector: '.faceclaim',
            layoutMode: 'fitRows',
            transitionDuration: '0.5s',
            sortBy: 'name',
            getSortData: {
                name: function(element) {
                    return $(element).find('p:first').text().toLowerCase();
                },
                subtitle: function(element) {
                    return $(element).find('.subtitle').text().toLowerCase();
                }
            }
        });

        // Objet pour stocker les filtres actifs
        var filters = {};

        // Filtrer les célébrités en fonction des boutons de filtre
        $('.filter-buttons button').click(function() {
            var $button = $(this);
            var filterGroup = $button.closest('.filter-buttons').attr('id');
            var filterValue = $button.attr('data-filter');

            // Ajouter la classe 'active' au bouton cliqué et la supprimer des autres boutons du même groupe
            $button.siblings().removeClass('active');
            $button.addClass('active');

            // Mettre à jour l'objet des filtres
            filters[filterGroup] = filterValue;

            // Combiner tous les filtres actifs
            var filterString = concatFilters(filters);
            $gallery.isotope({ filter: filterString });
        });

        // Filtrer les célébrités en fonction de la recherche
        $('#search').on('input', function() {
            var searchValue = this.value.toLowerCase();
            filters['search'] = function() {
                var name = $(this).find('p:first').text().toLowerCase();
                return name.indexOf(searchValue) > -1;
            };

            // Combiner tous les filtres actifs
            var filterString = concatFilters(filters);
            $gallery.isotope({ filter: filterString });
        });

        // Trier les célébrités par nom
        $('#sort-by-name').click(function() {
            $gallery.isotope({ sortBy: 'name' });
            // Mettre à jour le bouton actif
            $(this).addClass('active').siblings().removeClass('active');
        });

        // Trier les célébrités par sous-titre
        $('#sort-by-subtitle').click(function() {
            $gallery.isotope({ sortBy: 'subtitle' });
            // Mettre à jour le bouton actif
            $(this).addClass('active').siblings().removeClass('active');
        });

        // Fonction pour combiner les filtres
        function concatFilters(filters) {
            return Object.values(filters).map(value => value).join('');
        }

        // Ajouter la classe 'active' au bouton de tri par nom par défaut
        $('#sort-by-name').addClass('active');
    });
