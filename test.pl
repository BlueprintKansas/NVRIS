#!/usr/bin/env perl

use strict;
use warnings;

sub run_it {
    my ($cmd) = @_;
    print "$cmd\n";
    system($cmd) and die "$cmd failed: $!";
}

my %tests = (
    'test-vr-en-payload.json'       => '/vr/en',
    'test-vr-en-nosig-payload.json' => '/vr/en',
    'test-ab-en-payload.json'       => '/av/ksav1',
);

my $base64decode = $^O eq 'linux' ? '-d' : '-D';

sub client_tests {

    for my $payload ( sort keys %tests ) {
        ( my $png = $payload ) =~ s/\.json/.png/;
        my $path = $tests{$payload};
        my $tmp  = "$payload-out.json";
        run_it(
            qq{curl -s -XPOST -H 'Content-Type: application/json' --data \@$payload http://localhost:4501$path > $tmp}
        );
        run_it(
            qq{jq .img < $tmp | perl -n -e 's/"data:image\\/png;base64,|"//g; print' | base64 $base64decode > $png}
        );
        print "PNG saved in $png\n";

        my @out = `file $png`;
        print @out;

        run_it("rm $tmp");
    }

}

my $pid = fork();

if ($pid) {
    my $server_pid = fork() or exec("make run-test-server");
    print "Master test process $$ waiting for server $server_pid and client $pid to finish\n";
    waitpid($pid, 0);
    print "Child process finished\n";
    kill 'TERM', $server_pid;
    print "Sent TERM to $server_pid\n";
}
else {
    print "Waiting for server to start ...\n";
    sleep 10;
    client_tests();
    exit();
}
