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

                $gallery.isotope({
                    filter: function() {
                        var name = $(this).find('p:first').text().toLowerCase();
                        var subtitle = $(this).find('.subtitle').text().toLowerCase();
                        var matchesSearch = name.indexOf(searchValue) > -1 || subtitle.indexOf(searchValue) > -1;

                        if (matchesSearch) {
                            $(this).addClass('highlight');
                        } else {
                            $(this).removeClass('highlight');
                        }

                        return matchesSearch;
                    }
                });
            });

            // Effacer la recherche et réinitialiser les résultats
            $('#reset-search').click(function() {
                $('#search').val('');
                $gallery.isotope({ filter: '*' });
                $('.faceclaim').removeClass('highlight');
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
                var combinedFilter = '';
                for (var key in filters) {
                    if (filters[key]) {
                        combinedFilter += filters[key];
                    }
                }
                return combinedFilter;
            }

            // Ajouter la classe 'active' au bouton de tri par nom par défaut
            $('#sort-by-name').addClass('active');
        });
