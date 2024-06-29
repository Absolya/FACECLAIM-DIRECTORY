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

            // Function to update total counter
            function updateTotalCounter() {
                var total = $gallery.data('isotope').filteredItems.length;
                $('#total-counter').text(total);
            }

            // Objet pour stocker les filtres actifs
            var filters = {};

            // Filtrer les célébrités en fonction des boutons de filtre
            $('.filter-buttons button').click(function() {
                var $button = $(this);
                var filterGroup = $button.closest('.filter-buttons').attr('id');
                var filterValue = $button.attr('data-filter');
                
                // Mettre à jour les filtres actifs
                filters[filterGroup] = filterValue;
                var combinedFilter = concatFilters(filters);

                // Appliquer les filtres combinés
                $gallery.isotope({ filter: combinedFilter });

                // Mettre à jour le bouton actif
                $button.addClass('active').siblings().removeClass('active');

                // Mettre à jour le compteur total
                updateTotalCounter();
            });

            // Recherche de célébrités
            $('#search').on('input', function() {
                var searchValue = $(this).val().toLowerCase();

                $gallery.isotope({
                    filter: function() {
                        var name = $(this).find('p:first').text().toLowerCase();
                        var subtitle = $(this).find('.subtitle').text().toLowerCase();
                        return name.includes(searchValue) || subtitle.includes(searchValue);
                    }
                });

                // Mettre à jour le compteur total
                updateTotalCounter();
            });

            // Effacer la recherche
            $('#reset-search').click(function() {
                $('#search').val('');
                $gallery.isotope({ filter: '*' });

                // Mettre à jour le compteur total
                updateTotalCounter();
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

            // Initial update of the total counter
            updateTotalCounter();

            // Redirect button click event
            $('#redirect-button').click(function() {
                window.open('https://forms.gle/4K2vzJdYpFQupCzi6', '_blank'); // Remplacez par l'URL de votre autre page
            });
        });
