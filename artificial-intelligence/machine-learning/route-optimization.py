import math
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp

# Define the input data
data = {
 'depot': [0, 0],
 'customers': [
 [1, 50],
 [2, 30],
 [3, 40],
 [4, 35],
 [5, 60],
 ],
 'demands': [0, 10, 10, 10, 10],
 'vehicle_capacity': 100,
 'num_vehicles': 2,
 'depot_index': 0,
}

# Define the main function
def main():
 # Create the routing model
 routing = pywrapcp.RoutingModel(len(data['customers']) + 1, data['num_vehicles'])

 # Define the demand and capacity constraints
 demand_callback_index = routing.RegisterUnaryTransitCallback(
 lambda routing, from_index, to_index: data['demands'][to_index - 1])
 demand_callback = routing.GetCallbackObject(demand_callback_index)
 routing.AddDimensionWithVehicleCapacity(
 demand_callback, 0, data['vehicle_capacity'], True, data['num_vehicles'])

 # Define the distance matrix and transportation cost
 distance_matrix = [
 [0, 50, 30, 40, 60],
 [50, 0, 20, 10, 40],
 [30, 20, 0, 50, 70],
 [40, 10, 50, 0, 20],
 [60, 40, 70, 20, 0],
 ]

 routing.SetArcCostEvaluatorOfAllVehicles(
 lambda routing, from_index, to_index: distance_matrix[from_index][to_index])

 # Define the search parameters
 search_parameters = pywrapcp.DefaultRoutingSearchParameters()
 search_parameters.first_solution_strategy = (
 routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)
 search_parameters.local_search_metaheuristic = (
 routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH)
 search_parameters.time_limit.seconds = 10

 # Solve the problem
 assignment = routing.SolveWithParameters(search_parameters)

 # Print the solution
 if assignment:
 total_distance = 0
 num_vehicles = data['num_vehicles']

 for vehicle_id in range(num_vehicles):
 index = routing.Start(vehicle_id)
 route = []
 while not routing.IsEnd(index):
 route.append(index)
 previous_index = index
 index = assignment.Value(routing.NextVar(index))

 total_distance += routing.GetArcCostForVehicle(
 previous_index, index, vehicle_id)

 print(f"Route for vehicle {vehicle_id}:")
 for node in route:
 print(f"Node {node}: {data['customers'][node - 1][0]} miles")

 print(f"Total distance for {num_vehicles} vehicles: {math.ceil(total_distance / 1000)} km")

# Call the main function
if __name__ == '__main__':
 main()
