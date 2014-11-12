'use strict';

/**
 * @ngdoc function
 * @name beaconHunterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the beaconHunterApp
 */
angular.module('beaconHunterApp')
  .controller('MainCtrl', function ($scope, $timeout, $interval) {
    var baconBar1, baconBar2;
    $scope.game = {
        round: 1,
        scans: 22,
        remaining: 600,
        remainingString: function() {
            return this.remaining.toString().toHHMMSS();
        }
    };

    $scope.beacon1 = {
        css: 'alert-danger',
        data: [
            { y: 'Red', a: 0, color: '#e74c3c' },
            { y: 'Blue', a: 0, color: '#4ba4fc' },
            { y: 'Green', a: 0, color: '#00bc8c' },
            { y: 'Yellow', a: 0, color: '#fdfd96' }
          ]
    };

    $scope.beacon2 = {
        css: 'alert-success',
        data: [
            { y: 'Red', a: 0, color: '#e74c3c' },
            { y: 'Blue', a: 0, color: '#4ba4fc' },
            { y: 'Green', a: 0, color: '#00bc8c' },
            { y: 'Yellow', a: 0, color: '#fdfd96' }
          ]
    };

    $interval(function() {
        var scans = Math.floor((Math.random() * 10) + 1);
        var randomTeam = Math.floor((Math.random() * 4));
        $scope.game.scans += scans;
        if($scope.game.remaining > 0) {
            $scope.game.remaining--;
        }
        if(($scope.game.scans % 2) == 0) {
            $scope.beacon1.data[randomTeam].a += scans;
            baconBar1.setData($scope.beacon1.data);
        } else {
            $scope.beacon2.data[randomTeam].a  += scans;
            baconBar2.setData($scope.beacon2.data);
        }

        $scope.beacon1.css = _.max($scope.beacon1.data, function(data){ return data.a; }).y;
        $scope.beacon2.css = _.max($scope.beacon2.data, function(data){ return data.a; }).y;
    }, 1000);

    $timeout(function() {
        // Beacon 1
        baconBar1 = Morris.Bar({
          element: 'bar-bacon1',
          data: $scope.beacon1.data,
          hideHover: true,
          xkey: 'y',
          ykeys: ['a'],
          labels: ['Teams'],
          barColors: function (row, series, type) {
            if (type === 'bar') {
              return this.data[row.x].src.color;
            } else {
              return '#000';
            }
          }
        });

        // Beacon 2
        baconBar2 = Morris.Bar({
          element: 'bar-bacon2',
          data: $scope.beacon2.data,
          hideHover: true,
          xkey: 'y',
          ykeys: ['a'],
          labels: ['Teams'],
          barColors: function (row, series, type) {
            if (type === 'bar') {
              return this.data[row.x].src.color;
            } else {
              return '#000';
            }
          }
        });
    });
  });
