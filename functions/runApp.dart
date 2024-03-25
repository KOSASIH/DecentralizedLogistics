import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import './error_handler.dart';

void main() {
  GetIt.instance.registerSingleton<BuildContext>(context, instanceName: "context");

  runZonedGuarded<Future<void>>(
    () async {
      ...
      runApp(MyApp());
    },
    (error, stackTrace) {
      ErrorHandler.reportError(
        FlutterErrorDetails(
          context: GetIt.instance.get<BuildContext>(instanceName: "context"),
          exception: error,
          stack: stackTrace,
        ),
      );
    },
  );
}
